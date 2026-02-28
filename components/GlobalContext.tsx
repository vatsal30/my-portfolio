"use client";

import React, { createContext, useContext, useState } from "react";

interface GlobalContextType {
    isLLMView: boolean;
    setIsLLMView: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [isLLMView, setIsLLMView] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLLMView, setIsLLMView }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal() {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
}
