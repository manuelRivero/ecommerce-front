"use client";

import React, { useEffect, useState } from "react";
import { CssBaseline, Experimental_CssVarsProvider, Typography, Container, Stack, Button } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import { axiosInstance } from "@/client";
import { merriweather, openSans } from "@/fonts";
import PageLoader from "..";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import empty from "@/assets/images/wait.webp";
import Image from "next/image";
import Link from "next/link";

declare module "@mui/material/styles/createPalette" { }

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
  setState: () => { },
});

enum Status {
  PENDING = "pending",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  APPROVED = "approved",
  LOADING = "loading",
}

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
  const [fontClass, setFontClass] = useState("");
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tenant/get-tenant-config?tenant=${tenant}`
        );
        console.log("data", data)
        const titleFont = data.config.typography?.title || "Merriweather";
        const bodyFont = data.config.typography?.body || "OpenSans";

        // Determinar la clase de fuente a aplicar
        const fontMap: Record<string, NextFontWithVariable> = {
          Merriweather: merriweather,
          "Open Sans": openSans,
        };

        setFontClass(
          `${fontMap[titleFont].className} ${fontMap[bodyFont].className}`
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
                  default: data.config.palette.backgroundColor,
                },
                text: {
                  primary: data.config.palette.textColor,
                },
              },
            },
          },
          typography: {
            button: {
              textTransform: "none",
              fontFamily: fontMap[titleFont].style.fontFamily,
            },
            h1: {
              fontFamily: fontMap[titleFont].style.fontFamily,
              fontSize: "3rem",
            },
            h2: {
              fontFamily: fontMap[titleFont].style.fontFamily,
              fontSize: "2rem",
            },
            h3: {
              fontFamily: fontMap[titleFont].style.fontFamily,
              fontSize: "1.5rem",
            },
            h4: {
              fontFamily: fontMap[titleFont].style.fontFamily,
              fontSize: "1.3rem",
            },
            h5: {
              fontFamily: fontMap[titleFont].style.fontFamily,
              fontSize: "1rem",
            },
            h6: { fontFamily: fontMap[titleFont].style.fontFamily },
            body1: { fontFamily: fontMap[bodyFont].style.fontFamily },
          },
          // components: {
          //   MuiCssBaseline: {
          //     styleOverrides: {
          //       body: {
          //         backgroundImage: backgrounds.cross["background-image"]
          //       } ,
          //     },
          //   },
          // },
          // components: {
          //   MuiCssBaseline: {
          //     styleOverrides: `
          //       @font-face {
          //         font-family: 'Merriweather';
          //         font-style: normal;
          //         font-display: swap;
          //         font-weight: 400;
          //         src: local('Merriweather'), url('/fonts/merriweather/Merriweather-Regular.ttf') format('truetype');
          //       }
          //       @font-face {
          //         font-family: 'OpenSans';
          //         font-style: normal;
          //         font-display: swap;
          //         font-weight: 400;
          //         src: local('OpenSans'), url('/fonts/open-sans/OpenSans.ttf') format('truetype');
          //       }
          //     `,
          //   },
          // },
        });

        setTheme(dynamicTheme);
        setState({ config: data.config });

        // Flags de estado
        const paymentStatus = data.config?.paymentStatus
        const preapprovalStatus = data.config?.preapprovalStatus
        const lastStatusObj = Array.isArray(data.config?.userActionHistory) && data.config.userActionHistory.length > 0
          ? data.config.userActionHistory[data.config.userActionHistory.length - 1]
          : null;
        const lastStatus = lastStatusObj?.action;
        const isPaymentApproved = (preapprovalStatus === 'authorized' && paymentStatus === 'approved');
        const isPaymentPending = (preapprovalStatus === 'authorized' && paymentStatus === 'pending');
        const isPaymentPaused = (preapprovalStatus === 'paused' || paymentStatus === 'paused' || lastStatus === 'paused');
        const isPaymentCancelled = (preapprovalStatus === 'cancelled' || paymentStatus === 'cancelled' || lastStatus === 'cancelled');
        const isSubscriptionActive = (isPaymentApproved || isPaymentPaused || isPaymentPending) && !isPaymentCancelled;

        console.log("isPaymentPaused", isPaymentPaused)
        console.log("isPaymentCancelled", isPaymentCancelled)
        console.log("isPaymentPending", isPaymentPending)
        console.log("isPaymentApproved", isPaymentApproved)
        console.log("isSubscriptionActive", isSubscriptionActive)

        if (isPaymentPaused || isPaymentCancelled) {
          setStatus(Status.PAUSED);
        }

        if (isPaymentPending) {
          setStatus(Status.PENDING);
        }

        // Si el pago está aprobado pero la suscripción no está activa, mostrar todas las rutas
        if (isPaymentApproved && !isSubscriptionActive) {
          setStatus(Status.APPROVED);
        }

      } catch (error) {
        console.error("Error fetching theme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, [tenant]);

  const handleContent = ({ children }: { children: React.ReactNode }) => {
    if (status !== Status.APPROVED) {
      return <Container sx={{ marginY: 4 }}>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          ¡Pronto estaremos en linea otra vez!
        </Typography>
        <Typography variant="body1" color="text.primary" sx={{ textAlign: "center" }}>
          Estamos trabajando en mejorar la experiencia de usuario.
        </Typography>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Image width={400} height={400} src={empty.src} alt="no products" />
        </Stack>
        <Stack direction="column" justifyContent="center" alignItems="center">

          <Typography variant="body1" color="text.primary" sx={{ textAlign: "center" }}>
            ¿Tienes algún pedido en proceso?
          </Typography>
          <Button
            variant="contained"
            component={Link}
            href={`https://wa.me/${state.config.phone}?text=Hola, estoy escribiendo desde el enlace de la página web de ${state.config.name} y tengo una consulta`}

            sx={{ marginTop: 2 }}
          >
            Contactar a soporte
          </Button>
        </Stack>
      </Container>;
    }
    return <div>
      {children}
    </div>;
  }
  console.log("status", status)
  return (
    <IThemeContext.Provider value={{ state, setState }}>
      <Experimental_CssVarsProvider theme={theme} modeStorageKey="color_mode">
        <CssBaseline enableColorScheme />
        <div className={fontClass}>
          {loading || status === Status.LOADING ? <PageLoader position="fixed" /> : handleContent({ children })}
        </div>
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
