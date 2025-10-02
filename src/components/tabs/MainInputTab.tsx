"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner"; // Para exibir mensagens de erro

interface MainInputTabProps {
  objectSizeMm: string;
  setObjectSizeMm: (value: string) => void;
  observationDistanceCm: string;
  setObservationDistanceCm: (value: string) => void;
  subtendedAngle: number | null;
  setSubtendedAngle: (value: number | null) => void;
  avDecimal: number | null;
  setAvDecimal: (value: number | null) => void;
  snellenEquivalent: string | null;
  setSnellenEquivalent: (value: string | null) => void;
  logMAR: number | null;
  setLogMAR: (value: number | null) => void;
  demandingAvDecimal: number | null;
  setDemandingAvDecimal: (value: number | null) => void;
}

const MainInputTab: React.FC<MainInputTabProps> = ({
  objectSizeMm,
  setObjectSizeMm,
  observationDistanceCm,
  setObservationDistanceCm,
  subtendedAngle,
  setSubtendedAngle,
  avDecimal,
  setAvDecimal,
  snellenEquivalent,
  setSnellenEquivalent,
  logMAR,
  setLogMAR,
  demandingAvDecimal,
  setDemandingAvDecimal,
}) => {
  const handleCalculate = () => {
    const size = parseFloat(objectSizeMm);
    const distance = parseFloat(observationDistanceCm);

    if (isNaN(size) || isNaN(distance) || size <= 0 || distance <= 0) {
      toast.error("Por favor, insira valores numéricos positivos para o tamanho do objeto e a distância de observação.");
      resetResults();
      return;
    }

    // 1. Ângulo Subtendido (em minutos de arco - MAR)
    // Converter distância de cm para mm para unidades consistentes
    const observationDistanceMm = distance * 10;
    // Fórmula aproximada para ângulo visual em minutos de arco para ângulos pequenos
    // Constante 3438 é aproximadamente (180 / PI) * 60
    const calculatedSubtendedAngle = (size / observationDistanceMm) * 3438;
    setSubtendedAngle(calculatedSubtendedAngle);

    // 2. Conversão para Acuidade Visual Decimal (AV Decimal)
    // Assumindo que o ângulo subtendido é o Ângulo Mínimo de Resolução (MAR)
    const calculatedAvDecimal = 1 / calculatedSubtendedAngle;
    setAvDecimal(calculatedAvDecimal);

    // 3. Equivalente em escala de Snellen (6/X)
    // O denominador Snellen (X) é 6 vezes o Ângulo Mínimo de Resolução (MAR) em minutos de arco.
    let snellenXCalculated: number;
    if (calculatedSubtendedAngle === 0) {
      snellenXCalculated = Infinity; // Evitar divisão por zero se o ângulo for 0
    } else {
      snellenXCalculated = 6 * calculatedSubtendedAngle;
    }
    
    // Formatar o resultado:
    if (snellenXCalculated === Infinity) {
      setSnellenEquivalent("6/0 (Visão Perfeita)");
    } else if (snellenXCalculated < 0.01) { // Para denominadores muito pequenos, usar notação exponencial
      setSnellenEquivalent(`6/${snellenXCalculated.toExponential(0)}`);
    } else if (snellenXCalculated < 1) { // Se X for menor que 1, mostrar mais casas decimais
      setSnellenEquivalent(`6/${snellenXCalculated.toFixed(2)}`);
    } else {
      setSnellenEquivalent(`6/${snellenXCalculated.toFixed(0)}`); // Arredondar para o número inteiro mais próximo
    }

    // 4. Equivalente em escala LogMAR
    // LogMAR = log10(MAR_arcmin)
    const calculatedLogMAR = Math.log10(calculatedSubtendedAngle);
    setLogMAR(calculatedLogMAR);

    // 5. Estimativa da Acuidade Visual necessária para tarefas exigentes (o dobro da acuidade decimal)
    // "O dobro da acuidade decimal" implica uma visão melhor, então multiplicamos o valor decimal.
    const calculatedDemandingAvDecimal = calculatedAvDecimal * 2;
    setDemandingAvDecimal(calculatedDemandingAvDecimal);
  };

  const resetResults = () => {
    setObjectSizeMm("");
    setObservationDistanceCm("");
    setSubtendedAngle(null);
    setAvDecimal(null);
    setSnellenEquivalent(null);
    setLogMAR(null);
    setDemandingAvDecimal(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">Cálculos de Acuidade Visual</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="objectSizeMm">Tamanho do Objeto (mm)</Label>
          <Input
            id="objectSizeMm"
            type="number"
            value={objectSizeMm}
            onChange={(e) => setObjectSizeMm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: 1.5"
            min="0.1"
            step="0.1"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="observationDistanceCm">Distância de Observação (cm)</Label>
          <Input
            id="observationDistanceCm"
            type="number"
            value={observationDistanceCm}
            onChange={(e) => setObservationDistanceCm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: 40"
            min="1"
            step="1"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCalculate} className="mt-4">
          Calcular
        </Button>
        <Button onClick={resetResults} variant="outline" className="mt-4 ml-2">
          Limpar
        </Button>
      </div>

      {(subtendedAngle !== null || avDecimal !== null || snellenEquivalent !== null || logMAR !== null || demandingAvDecimal !== null) && (
        <Card className="mt-6 max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {subtendedAngle !== null && (
              <p className="text-lg">
                <strong>Ângulo Subtendido (minutos de arco):</strong>{" "}
                <span className="font-bold">{subtendedAngle.toFixed(2)}'</span>
              </p>
            )}
            {avDecimal !== null && (
              <p className="text-lg">
                <strong>Acuidade Visual Decimal:</strong>{" "}
                <span className="font-bold">{avDecimal.toFixed(2)}</span>
              </p>
            )}
            {snellenEquivalent !== null && (
              <p className="text-lg">
                <strong>Equivalente Snellen:</strong>{" "}
                <span className="font-bold">{snellenEquivalent}</span>
              </p>
            )}
            {logMAR !== null && (
              <p className="text-lg">
                <strong>Equivalente LogMAR:</strong>{" "}
                <span className="font-bold">{logMAR.toFixed(2)}</span>
              </p>
            )}
            {demandingAvDecimal !== null && (
              <p className="text-lg">
                <strong>AV Necessária (Tarefas Exigentes):</strong>{" "}
                <span className="font-bold">{demandingAvDecimal.toFixed(2)}</span>
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MainInputTab;