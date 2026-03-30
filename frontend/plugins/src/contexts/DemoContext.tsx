import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { DemoContextValue } from "@/types";

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemo = () => setIsOpen(true);
  const closeDemo = () => setIsOpen(false);

  return (
    <DemoContext.Provider value={{ isOpen, openDemo, closeDemo }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
