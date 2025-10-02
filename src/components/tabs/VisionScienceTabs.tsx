"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculationTab from "./CalculationTab";
import FullFledgedCalculatorTab from "./FullFledgedCalculatorTab";
import VisualAcuityTab from "./VisualAcuityTab"; // Import the new VisualAcuityTab component

const VisionScienceTabs: React.FC = () => {
  // Example formulas - you can customize these
  const formula2 = (values: number[]) => values[0] * values[1] / (values[0] + values[1]); // Example: Lens power calculation
  const formula3 = (values: number[]) => (values[0] - values[1]) / values[2]; // Example: Percentage difference

  return (
    <Tabs defaultValue="tab1" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tab1">Acuidade Visual</TabsTrigger>
        <TabsTrigger value="tab2">Refração</TabsTrigger>
        <TabsTrigger value="tab3">Lentes de Contato</TabsTrigger>
        <TabsTrigger value="tab4">Calculadora</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <VisualAcuityTab /> {/* Using the new dedicated component */}
      </TabsContent>
      <TabsContent value="tab2">
        <CalculationTab
          title="Cálculo de Refração"
          inputLabels={["Poder Esférico (D)", "Poder Cilíndrico (D)"]}
          formula={formula2}
          resultLabel="Equivalente Esférico (D)"
        />
      </TabsContent>
      <TabsContent value="tab3">
        <CalculationTab
          title="Cálculo de Lentes de Contato"
          inputLabels={["Curva Base (mm)", "Diâmetro (mm)", "Poder (D)"]}
          formula={formula3}
          resultLabel="Ajuste da Lente"
        />
      </TabsContent>
      <TabsContent value="tab4">
        <FullFledgedCalculatorTab />
      </TabsContent>
    </Tabs>
  );
};

export default VisionScienceTabs;