import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { light } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
