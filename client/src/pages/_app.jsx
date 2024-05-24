import { StateProvider } from "@/context/StateContext"; // Import StateProvider from StateContext
import reducer, { initialState } from "@/context/StateReducers"; // Import reducer and initialState from StateReducers
import "@/styles/globals.css"; // Import global styles
import Head from "next/head"; // Import Head component from next/head

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}> {/* Wrap the app with StateProvider */}
      <Head>
        <title>Whatsapp</title> {/* Set page title */}
        <link rel="shortcut icon" href="/favicon.png" /> {/* Set favicon */}
      </Head>
      <Component {...pageProps} /> {/* Render the main component */}
    </StateProvider>
  );
}
