import { createContext, ReactNode, useContext, useState } from "react";

export type Farmer = {
  firstName: string;
  lastName: string;
  cooperative: string;
  municipality: string;
  variety: string;
  farmSize: string;
  phone: string;
};

const defaultFarmer: Farmer = {
  firstName: "Maria",
  lastName: "Santos",
  cooperative: "Miagao Rice Cooperative",
  municipality: "Miagao, Iloilo",
  variety: "NSIC Rc222",
  farmSize: "2.5 hectares",
  phone: "+63 912 345 6789",
};

type FarmerContextType = {
  farmer: Farmer;
  setFarmer: (farmer: Farmer) => void;
};

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export function FarmerProvider({ children }: { children: ReactNode }) {
  const [farmer, setFarmer] = useState(defaultFarmer);

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
}

export function useFarmer() {
  const context = useContext(FarmerContext);

  if (!context) {
    throw new Error("useFarmer must be used inside FarmerProvider");
  }

  return context;
}