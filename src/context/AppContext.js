"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [section, setSection] = useState("overview");
  const [sidebar, setSidebar] = useState(false);

  return (
    <AppContext.Provider value={{ section, setSection, sidebar, setSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
