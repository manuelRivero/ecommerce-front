"use client"
import React, { useEffect, useState } from 'react'
import { CssBaseline, Experimental_CssVarsProvider } from '@mui/material'
import { extendTheme } from "@mui/material/styles";
import { axiosInstance } from '@/client';
import PageLoader from '..';

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    medalGold: PaletteColorOptions;
    disabledGray: PaletteColorOptions
  }
}


const ThemeProvider = ( {children, tenant}: { children: React.ReactNode, tenant: string }) => {
  const [theme, setTheme] = useState(extendTheme()); // Tema por defecto
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const {data} = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/tenant/get-tenant-config?tenant=${tenant}`)
    
  
        console.log("data.config.palette", data.config.palette)
        // Generar el tema dinámicamente
        const dynamicTheme = extendTheme({
          colorSchemes: {
            light: {
              palette: {
                primary: {
                  dark: "#ffb6ae",
                  main: data.config.palette.primary.main,
                  light: "#fff",
                  contrastText: "#620505",
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
                  main: '#97a2aa'
                }
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
                  src: local('Merriweather'), local('Merriweather-Regular'), url('/fonts/merriweather/Merriweather-Regular.ttf') format('truetype');
                  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                };
                @font-face {
                    font-family: 'OpenSans';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('OpenSans'), local('OpenSans'), url('/fonts/open-sans/OpenSans.ttf') format('truetype');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                  }
              `,
            },
          },
        });
  
        setTheme(dynamicTheme);
      } catch (error) {
        console.log("theme error ", error)
      } finally{
        setLoading(false)
      }
    };

    fetchTheme();
  }, []);
  return(
  <Experimental_CssVarsProvider theme={theme} modeStorageKey="color_mode">
  <CssBaseline enableColorScheme />
  {loading ? <PageLoader /> : children}
</Experimental_CssVarsProvider>
)}

export default ThemeProvider