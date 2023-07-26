import type { AppProps } from "next/app";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "../styles/globals.css";

//theme
import "primereact/resources/themes/lara-light-purple/theme.css";

//core
import "primereact/resources/primereact.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
