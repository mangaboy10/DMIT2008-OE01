// this file affects all components (here, it's just globally applying CSS styles)
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
