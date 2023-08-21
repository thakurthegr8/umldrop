import React, { useState } from 'react'
import '@/styles/globals.css'
import "nprogress/nprogress.css";
import { Router } from "next/router"
import nProgress from 'nprogress';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
  >
    <Component {...pageProps} />
  </SessionContextProvider>
}
