"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SeasonContextProps {
  season: string;
  setSeason: (season: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}

const SeasonContext = createContext<SeasonContextProps | undefined>(undefined);

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }
  return context;
};

export const SeasonProvider = ({ children }: { children: ReactNode }) => {
  const [season, setSeason] = useState("Spring");
  const [bgColor, setBgColor] = useState("#000");

  return (
    <SeasonContext.Provider value={{ season, setSeason, bgColor, setBgColor }}>
      {children}
    </SeasonContext.Provider>
  );
};
