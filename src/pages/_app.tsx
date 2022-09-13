import "src/lib/tailwind.css";
import type { CustomAppPage } from "next/app";
import { MantineProvider } from "@mantine/core";

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionOptions={{ key: "mantine", prepend: false }}
    >
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
};

export default MyApp;
