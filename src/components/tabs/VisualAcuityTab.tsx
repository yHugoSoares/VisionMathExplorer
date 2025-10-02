"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const VisualAcuityTab: React.FC = () => {
  const [distanciaTeste, setDistanciaTeste] = useState<number>(20); // Valor padrão para 20 metros/pés
  const [linhaLida, setLinhaLida] = useState<number>(20);       // Valor padrão para linha 20 (equivalente a 20/20)
  const [avDecimal, setAvDecimal] = useState<number | null>(null);
  const [notacaoPT, setNotacaoPT] = useState<string | null>(null);
  const [interpretacao, setInterpretacao] = useState<string | null>(null);

  const handleCalculate = () => {
    if (distanciaTeste === 0 || linhaLida === 0) {
      setAvDecimal(null);
      setNotacaoPT(null);
      setInterpretacao("Por favor, insira valores válidos para a distância de teste e a linha lida.");
      return;
    }

    const calculatedAvDecimal = distanciaTeste / linhaLida;
    const calculatedNotacao = `${distanciaTeste}/${linhaLida}`;

    let calculatedInterpretacao = '';
    if (calculatedAvDecimal >= 1.0) calculatedInterpretacao = 'Visão normal';
    else if (calculatedAvDecimal >= 0.8) calculatedInterpretacao = 'Visão quase normal';
    else if (calculatedAvDecimal >= 0.5) calculatedInterpretacao = 'Deficiência visual moderada';
    else if (calculatedAvDecimal >= 0.3) calculatedInterpretacao = 'Deficiência visual significativa';
    else if (calculatedAvDecimal >= 0.1) calculatedInterpretacao = 'Baixa visão';
    else calculatedInterpretacao = 'Cegueira legal';

    setAvDecimal(calculatedAvDecimal);
    setNotacaoPT(calculatedNotacao);
    setInterpretacao(calculatedInterpretacao);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">Cálculo de Acuidade Visual - Sistema Métrico</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="distanciaTeste">Distância de Teste (metros)</Label>
          <Input
            id="distanciaTeste"
            type="number"
            value={distanciaTeste}
            onChange={(e) => setDistanciaTeste(parseFloat(e.target.value) || 0)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: 20, 10, 60"
            min="1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linhaLida">Menor linha lida no cartão</Label>
          <Input
            id="linhaLida"
            type="number"
            value={linhaLida}
            onChange={(e) => setLinhaLida(parseFloat(e.target.value) || 0)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: 20, 30, 400"
            min="1"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCalculate} className="mt-4">
          Calcular Acuidade Visual
        </Button>
      </div>
      {(avDecimal !== null || interpretacao !== null) && (
        <Card className="mt-6 max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Resultados da Acuidade Visual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {avDecimal !== null && (
              <p className="text-xl">
                <strong>Acuidade Visual (Decimal):</strong>{" "}
                <span className="font-bold">{avDecimal.toFixed(2)}</span>
              </p>
            )}
            {notacaoPT !== null && (
              <p className="text-xl">
                <strong>Notação:</strong>{" "}
                <span className="font-bold">{notacaoPT}</span>
              </p>
            )}
            {interpretacao !== null && (
              <p className="text-xl">
                <strong>Interpretação:</strong>{" "}
                <span className="font-bold">{interpretacao}</span>
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualAcuityTab;