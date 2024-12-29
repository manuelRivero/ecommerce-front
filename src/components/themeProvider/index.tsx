"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CssBaseline, Experimental_CssVarsProvider } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import { axiosInstance } from "@/client";
import PageLoader from "..";
import { ThemeContext } from "@emotion/react";

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    medalGold?: PaletteColorOptions;
    disabledGray?: PaletteColorOptions;
  }
}

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

const ThemeProvider = ({
  children,
  tenant,
}: {
  children: React.ReactNode;
  tenant: string;
}) => {
  const [theme, setTheme] = useState(extendTheme());
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tenant/get-tenant-config?tenant=${tenant}`
        );

        const dynamicTheme = extendTheme({
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  dark: data.config.palette.primary.dark,
                  main: data.config.palette.primary.main,
                  light: data.config.palette.primary.light,
                  contrastText: data.config.palette.primary.contrastText,
                },
                secondary: {
                  main: "#29A6E5",
                  light: "#69c1ed",
                  dark: "#1f95de",
                  contrastText: "#fff",
                },
                background: {
                  default: "#faf9f6",
                },
                text: {
                  primary: "#2F4858",
                },
                medalGold: {
                  main: "#FFD700",
                },
                disabledGray: {
                  main: "#97a2aa",
                },
              },
            },
          },
          typography: {
            button: {
              textTransform: "none",
              fontFamily: "Merriweather",
            },
            h1: { fontFamily: "Merriweather", fontSize: "3rem" },
            h2: { fontFamily: "Merriweather", fontSize: "2rem" },
            h3: { fontFamily: "Merriweather", fontSize: "1.5rem" },
            h4: { fontFamily: "Merriweather", fontSize: "1.3rem" },
            h5: { fontFamily: "Merriweather", fontSize: "1rem" },
            h6: { fontFamily: "Merriweather" },
            body1: { fontFamily: "OpenSans" },
          },
          components: {
            MuiCssBaseline: {
              styleOverrides: `
                @font-face {
                  font-family: 'Merriweather';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;
                  src: local('Merriweather'), url('/fonts/merriweather/Merriweather-Regular.ttf') format('truetype');
                }
                @font-face {
                  font-family: 'OpenSans';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;
                  src: local('OpenSans'), url('/fonts/open-sans/OpenSans.ttf') format('truetype');
                }
              `,
            },
          },
        });

        setTheme(dynamicTheme);
        setState({ config: data.config });
      } catch (error) {
        console.error("Error fetching theme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [tenant]);

  return (
    <IThemeContext.Provider value={{ state, setState }}>
      <Experimental_CssVarsProvider theme={theme} modeStorageKey="color_mode">
        <CssBaseline enableColorScheme />
        {loading ? <PageLoader /> : children}
      </Experimental_CssVarsProvider>
    </IThemeContext.Provider>
  );
};

export const useITheme = () => {
  const context = React.useContext(IThemeContext);
  if (!context) {
    throw new Error("useITheme must be used within ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
