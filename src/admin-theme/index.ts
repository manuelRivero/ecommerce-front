import { extendTheme } from "@mui/material/styles";

const adminTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          dark: "#000",
          main: "#000",
          light: "#fff",
          contrastText: "#fff",
        },
        secondary: {
          main: "#fff",
          light: "#f5f5f5",
          dark: "#222",
          contrastText: "#000",
        },
        background: {
          default: "#fff",
        },
        text: {
          primary: "#000",
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

export { adminTheme }; 