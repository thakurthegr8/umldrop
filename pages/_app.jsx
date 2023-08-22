import React, { useState } from 'react'
import '@/styles/globals.css'
import "nprogress/nprogress.css";
import { Router } from "next/router"
import nProgress from 'nprogress';
import AuthProvider from '@/src/providers/Auth';

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function App({ Component, pageProps }) {

  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}
