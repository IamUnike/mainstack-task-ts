import axios from "axios";
import { useQuery } from "react-query";

const request = axios.create({
  baseURL: "https://test.api.mainstack.io",
});

export const useGetAnalytics = () => {
  return useQuery(
    "analytics",
    () => request.get(`/`, { headers: {} }).then((res) => res),
    { refetchOnWindowFocus: false }
  );
};
