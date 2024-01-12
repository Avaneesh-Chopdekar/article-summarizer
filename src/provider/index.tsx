"use client";
import { store } from "@/services/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function AppProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
