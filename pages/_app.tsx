import "/styles/globals.css";
import "@fontsource/public-sans/400.css";
import "@fontsource/public-sans/500.css";
import "@fontsource/public-sans/600.css";
import "@fontsource/public-sans/700.css";
import type { AppProps } from "next/app";
import NavProvider from "../contexts/NavContext";
import MainLayout from "../layouts/MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </NavProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
