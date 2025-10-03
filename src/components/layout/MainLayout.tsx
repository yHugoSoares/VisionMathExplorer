import React from "react";
import { ModeToggle } from "@/components/ModeToggle"; // Import ModeToggle

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Aplicações das Ciências da Visão</h1>
          <ModeToggle /> {/* Added Theme Toggle */}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      { <footer className="p-4 text-right text-sm text-muted-foreground">
        Made by: Hugo Soares
      </footer> }
    </div>
  );
};

export default MainLayout;