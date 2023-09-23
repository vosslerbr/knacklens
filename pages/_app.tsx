import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { PrimeReactProvider } from "primereact/api";
import "../styles/reset.css";
import "../styles/globals.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primeflex/primeflex.css";

import "primeicons/primeicons.css";

//core
import "primereact/resources/primereact.min.css";
import Store from "@/components/Store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Store>
      <PrimeReactProvider>{getLayout(<Component {...pageProps} />)}</PrimeReactProvider>
    </Store>
  );
}
