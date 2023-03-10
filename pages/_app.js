// import "@/styles/globals.css";
import Layout from "./Components/Layout/Layout";
import { Provider } from "react-redux";
import store from "./store";
import {
  Open_Sans,
  MontserratRoboto,
  Montserrat,
  Lato,
  Noto_Sans,
  Poppins,
  Source_Sans_Pro,
  Raleway,
  Ubuntu,
  Merriweather,
} from "@next/font/google";

const font = Source_Sans_Pro({
  subsets: ["vietnamese"],
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={font.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
