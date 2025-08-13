"use client";

import React, { useState } from "react";
import { CssBaseline, Experimental_CssVarsProvider } from "@mui/material";
import { adminTheme } from "@/admin-theme";

export type State = {
  config: any;
};

const initialState: State = {
  config: [],
};

const IThemeContext = React.createContext<{
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}>({
  state: initialState,
  setState: () => {},
});

const AdminThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(initialState);

  return (
    <IThemeContext.Provider value={{ state, setState }}>
      <Experimental_CssVarsProvider theme={adminTheme} modeStorageKey="color_mode">
        <CssBaseline enableColorScheme />
        <div>
          {children}
        </div>
      </Experimental_CssVarsProvider>
    </IThemeContext.Provider>
  );
};

export const useITheme = () => {
  const context = React.useContext(IThemeContext);
  if (!context) {
    throw new Error("useITheme must be used within AdminThemeProvider");
  }
  return context;
};

export default AdminThemeProvider; 