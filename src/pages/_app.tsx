import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

console.log(process.env.NEXT_PUBLIC_TEST_KEY);

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
