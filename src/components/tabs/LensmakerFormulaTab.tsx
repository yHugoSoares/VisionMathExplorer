"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface LensmakerFormulaTabProps {
  lensPower: string;
  setLensPower: (value: string) => void;
  vertexDistance: string;
  setVertexDistance: (value: string) => void;
  effectivePower: number | null;
  setEffectivePower: (value: number | null) => void;
}

const LensmakerFormulaTab: React.FC<LensmakerFormulaTabProps> = ({
  lensPower,
  setLensPower,
  vertexDistance,
  setVertexDistance,
  effectivePower,
  setEffectivePower,
}) => {
  const handleCalculate = () => {
    const F = parseFloat(lensPower);
    const d_mm = parseFloat(vertexDistance); // Distância em milímetros

    if (isNaN(F) || isNaN(d_mm)) {
      toast.error("Por favor, insira valores numéricos válidos para a potência da lente e a distância do vértice.");
      resetResults();
      return;
    }

    // Converter distância do vértice de milímetros para metros
    const d_meters = d_mm / 1000;

    // Fórmula para compensação da distância do vértice: F_eff = F / (1 - d * F)
    // Onde F é a potência da lente dos óculos e d é a distância do vértice em metros.
    try {
      const denominator = 1 - d_meters * F;
      if (denominator === 0) {
        toast.error("Cálculo inválido: O denominador é zero. Verifique os valores de potência e distância.");
        setEffectivePower(null);
        return;
      }
      const calculatedEffectivePower = F / denominator;
      setEffectivePower(calculatedEffectivePower);
    } catch (error) {
      toast.error("Ocorreu um erro no cálculo. Verifique os valores inseridos.");
      setEffectivePower(null);
    }
  };

  const resetResults = () => {
    setLensPower("");
    setVertexDistance("");
    setEffectivePower(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">Compensação da Distância do Vértice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          <Label htmlFor="lensPower">Potência da Lente dos Óculos (F em Dioptrias)</Label>
          <Input
            id="lensPower"
            type="number"
            value={lensPower}
            onChange={(e) => setLensPower(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: -5.00 ou +3.50"
            step="0.01"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vertexDistance">Distância do Vértice (d em Milímetros)</Label>
          <Input
            id="vertexDistance"
            type="number"
            value={vertexDistance}
            onChange={(e) => setVertexDistance(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ex: 12 (12 mm)"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCalculate} className="mt-4">
          Calcular Potência Efetiva
        </Button>
        <Button onClick={resetResults} variant="outline" className="mt-4 ml-2">
          Limpar
        </Button>
      </div>

      {effectivePower !== null && (
        <Card className="mt-6 max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg">
              <strong>Potência Efetiva no Olho:</strong>{" "}
              <span className="font-bold">{effectivePower.toFixed(2)} D</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LensmakerFormulaTab;