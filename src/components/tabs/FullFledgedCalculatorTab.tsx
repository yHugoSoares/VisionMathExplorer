"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FullFledgedCalculatorTab: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleButtonClick = (value: string) => {
    if (result !== null && (/\d/.test(value) || value === '.')) {
      // If there's a result and a new number/decimal is pressed, start a new calculation
      setInput(value);
      setResult(null);
    } else if (result !== null && ['+', '-', '*', '/', '%', '^'].includes(value)) {
      // If there's a result and an operator is pressed, continue with the result
      setInput(result + value);
      setResult(null);
    } else {
      setInput((prev) => prev + value);
      setResult(null);
    }
    inputRef.current?.focus(); // Keep focus on the input after button click
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    inputRef.current?.focus(); // Keep focus on the input after clearing
  };

  const handleEquals = () => {
    if (input.trim() === "") {
      setResult(null);
      return;
    }
    try {
      // Replace common math functions and operators for evaluation
      const sanitizedInput = input
        .replace(/,/g, '.') // Replace ',' with '.' for decimal separation
        .replace(/x/g, '*') // Replace 'x' with '*' for multiplication
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(') // Common log base 10
        .replace(/ln\(/g, 'Math.log(')    // Natural log
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/pi/g, 'Math.PI')
        .replace(/\^/g, '**'); // Replace ^ with ** for exponentiation

      // Using Function constructor for safer eval, though still not entirely risk-free for untrusted input
      const calculatedResult = new Function('return ' + sanitizedInput)();
      
      // Format result: show decimals only if necessary
      if (Number.isInteger(calculatedResult)) {
        setResult(calculatedResult.toString());
      } else {
        setResult(calculatedResult.toFixed(4).toString());
      }
    } catch (error) {
      toast.error("Expressão inválida.");
      setResult("Erro");
    }
    inputRef.current?.focus(); // Keep focus on the input after calculation
  };

  const handleScientificFunction = (func: string) => {
    // Append function call or constant to input
    if (func === "pi") {
      setInput((prev) => prev + "pi");
    } else {
      setInput((prev) => prev + func + "(");
    }
    setResult(null);
    inputRef.current?.focus(); // Keep focus on the input after function click
  };

  const buttons = [
    "C", "(", ")", "%",
    "sin", "cos", "tan", "sqrt",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "pi", "log", "ln", "^",
  ];

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-semibold text-center">Calculadora Científica Completa</h2>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <Input
            ref={inputRef}
            id="calculator-input"
            type="text"
            value={result !== null ? result : input}
            onChange={(e) => {
              // If a result is currently displayed, clear it and start new input
              if (result !== null) {
                setInput(e.target.value);
                setResult(null);
              } else {
                setInput(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEquals();
                e.preventDefault(); // Prevent default form submission
              } else if (e.key === "Escape") {
                handleClear();
                e.preventDefault(); // Prevent default browser behavior for escape
              }
              // Other keys are handled by the onChange event updating the input state
            }}
            placeholder="0"
            className="text-right text-2xl h-12"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((button) => (
              <Button
                key={button}
                onClick={() => {
                  if (button === "C") handleClear();
                  else if (button === "=") handleEquals();
                  else if (["sin", "cos", "tan", "sqrt", "log", "ln", "pi"].includes(button)) handleScientificFunction(button);
                  else handleButtonClick(button);
                }}
                className={cn(
                  "col-span-1",
                  ["C", "=", "/", "*", "-", "+", "%", "^"].includes(button) && "bg-primary text-primary-foreground hover:bg-primary/90",
                  ["sin", "cos", "tan", "sqrt", "log", "ln", "pi"].includes(button) && "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                )}
              >
                {button}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FullFledgedCalculatorTab;