import "../styles/globals.css";
import Script from "next/script";
import Layout from "../component/Layout";
import { useState, useEffect } from "react";
import GlobalContextProvider from "../Contexts/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></Script>
        <Script
          async
          defer
          src="https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js"
        ></Script>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp;
