import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculationTab from "./CalculationTab";

const VisionScienceTabs: React.FC = () => {
  // Example formulas - you can customize these
  const formula1 = (values: number[]) => values[0] + values[1]; // Simple addition
  const formula2 = (values: number[]) => values[0] * values[1] / (values[0] + values[1]); // Example: Lens power calculation
  const formula3 = (values: number[]) => (values[0] - values[1]) / values[2]; // Example: Percentage difference

  return (
    <Tabs defaultValue="tab1" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Acuidade Visual</TabsTrigger>
        <TabsTrigger value="tab2">Refração</TabsTrigger>
        <TabsTrigger value="tab3">Lentes de Contato</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <CalculationTab
          title="Cálculo de Acuidade Visual"
          inputLabels={["Distância (metros)", "Tamanho da Letra (mm)"]}
          formula={formula1}
          resultLabel="Acuidade Visual (Snellen)"
        />
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
    </Tabs>
  );
};

export default VisionScienceTabs;