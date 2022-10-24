import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CMSProvider } from "../context/cms/CMSContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CMSProvider>
      <Component {...pageProps} />
    </CMSProvider>
  );
}

export default MyApp;
