import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import Error from "next/error";
import { ThemeProvider } from "styled-components";
import { light } from "../styles/theme";
import GlobalStyles from "../styles/globalStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

interface CustomAppProps extends NextPageProps {}

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

function MyApp({ Component, pageProps }: AppProps<CustomAppProps>) {
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    );
  }
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
