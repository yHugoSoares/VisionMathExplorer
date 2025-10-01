import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CalculationTabProps {
  title: string;
  inputLabels: string[];
  formula: (values: number[]) => number;
  resultLabel: string;
}

const CalculationTab: React.FC<CalculationTabProps> = ({
  title,
  inputLabels,
  formula,
  resultLabel,
}) => {
  const [inputValues, setInputValues] = useState<number[]>(
    Array(inputLabels.length).fill(0)
  );
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = parseFloat(value) || 0;
    setInputValues(newValues);
  };

  const handleCalculate = () => {
    setResult(formula(inputValues));
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {inputLabels.map((label, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`input-${index}`}>{label}</Label>
            <Input
              id={`input-${index}`}
              type="number"
              value={inputValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Enter number"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCalculate} className="mt-4">
          Calcular
        </Button>
      </div>
      {result !== null && (
        <Card className="mt-6 max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>{resultLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{result.toFixed(2)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CalculationTab;