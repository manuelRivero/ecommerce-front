import localFont from "next/font/local";

// Define las fuentes
export const merriweather = localFont({
  src: [
    {
      path: "../../public/fonts/merriweather/Merriweather-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-merriweather", // Nombre CSS para la fuente
});

export const openSans = localFont({
  src: [
    {
      path: "../../public/fonts/open-sans/OpenSans.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-opensans",
});
