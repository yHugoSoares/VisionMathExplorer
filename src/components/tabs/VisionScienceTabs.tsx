"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainInputTab from "./MainInputTab";
import FullFledgedCalculatorTab from "./FullFledgedCalculatorTab";
import LensmakerFormulaTab from "./LensmakerFormulaTab";

const VisionScienceTabs: React.FC = () => {
  // State for MainInputTab
  const [objectSizeMm, setObjectSizeMm] = useState<string>("");
  const [observationDistanceCm, setObservationDistanceCm] = useState<string>("");
  const [subtendedAngle, setSubtendedAngle] = useState<number | null>(null);
  const [subtendedAngleDetail, setSubtendedAngleDetail] = useState<number | null>(null); // Novo estado
  const [avDecimal, setAvDecimal] = useState<number | null>(null);
  const [snellenEquivalent, setSnellenEquivalent] = useState<string | null>(null);
  const [logMAR, setLogMAR] = useState<number | null>(null);
  const [demandingAvDecimal, setDemandingAvDecimal] = useState<number | null>(null);

  // State for LensmakerFormulaTab
  const [lensPower, setLensPower] = useState<string>("");
  const [vertexDistance, setVertexDistance] = useState<string>("");
  const [effectivePower, setEffectivePower] = useState<number | null>(null);

  return (
    <Tabs defaultValue="mainTab" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="mainTab">Acuidade Visual</TabsTrigger>
        {/* <TabsTrigger value="lensmakerTab">Lensmaker</TabsTrigger> */}
        {/* <TabsTrigger value="calculatorTab">Calculadora</TabsTrigger> */}
      </TabsList>
      <TabsContent value="mainTab">
        <MainInputTab
          objectSizeMm={objectSizeMm}
          setObjectSizeMm={setObjectSizeMm}
          observationDistanceCm={observationDistanceCm}
          setObservationDistanceCm={setObservationDistanceCm}
          subtendedAngle={subtendedAngle}
          setSubtendedAngle={setSubtendedAngle}
          subtendedAngleDetail={subtendedAngleDetail} // Passando o novo estado
          setSubtendedAngleDetail={setSubtendedAngleDetail} // Passando o novo setter
          avDecimal={avDecimal}
          setAvDecimal={setAvDecimal}
          snellenEquivalent={snellenEquivalent}
          setSnellenEquivalent={setSnellenEquivalent}
          logMAR={logMAR}
          setLogMAR={setLogMAR}
          demandingAvDecimal={demandingAvDecimal}
          setDemandingAvDecimal={setDemandingAvDecimal}
        />
      </TabsContent>
      {/* <TabsContent value="lensmakerTab"> */}
        {/* <LensmakerFormulaTab
          lensPower={lensPower}
          setLensPower={setLensPower}
          vertexDistance={vertexDistance}
          setVertexDistance={setVertexDistance}
          effectivePower={effectivePower}
          setEffectivePower={setEffectivePower}
        /> */}
      {/* </TabsContent> */}
      {/* <TabsContent value="calculatorTab"> */}
        {/* <FullFledgedCalculatorTab /> */}
      {/* </TabsContent> */}
    </Tabs>
  );
};

export default VisionScienceTabs;