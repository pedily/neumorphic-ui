import { createContext, useContext } from "react";

export interface ISoftContext {
  color: string;
  angle: number;
  elevationDepth: number;
  dentDepth: number;
}

const SoftContext = createContext<ISoftContext>({
  color: "#e8d1bf",
  angle: 0,
  elevationDepth: 10,
  dentDepth: 1,
});

export const useSoftContext = () => useContext(SoftContext);

export const SoftProvider = SoftContext.Provider;
