// import { useQuery } from "@tanstack/react-query";
// import api from "../axios/axios";

// const getCountries = async () => {
//   const response = await api.get("/countries/");
//   return response.data;
// };

// const useCountries = () => {
//   return useQuery({
//     queryKey: ["countries"],
//     queryFn: getCountries,
//   });
// };

// export default useCountries;



import api from "../axios/axios";
import { useQuery } from "@tanstack/react-query";

export default function getCountries() {
  const { data, isPending, isError, isLoading ,error} = useQuery({
    queryKey: ["countries"],
    queryFn: () => api.get("/countries/"),
  });

  return {
    data: data?.data,
    isLoading,
    isPending,
    isError,
    error,
  };
}