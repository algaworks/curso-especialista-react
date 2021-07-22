import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { light } from "../styles/theme";
import GlobalStyles from "../styles/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <Header />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
      <GlobalStyles />
    </ThemeProvider>
  );
}
export default MyApp;
