import "/styles/globals.css";
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
