import { createContext, ReactNode, useContext, useState } from "react";

export type Field = {
  id: string;
  name: string;
  status: string;
  waterLevel: number;
};

const defaultField: Field = {
  id: "MR-014",
  name: "Miagao Rice Field",
  status: "Healthy",
  waterLevel: 14,
};

type FieldContextType = {
  currentField: Field;
  setCurrentField: (field: Field) => void;
};

const FieldContext = createContext<FieldContextType | undefined>(undefined);

export function FieldProvider({ children }: { children: ReactNode }) {
  const [currentField, setCurrentField] = useState(defaultField);

  return (
    <FieldContext.Provider value={{ currentField, setCurrentField }}>
      {children}
    </FieldContext.Provider>
  );
}

export function useField() {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("useField must be used inside FieldProvider");
  }

  return context;
}