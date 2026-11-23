import { useQuery } from "@tanstack/react-query";
import api from "../axios/axios";

const getCountries = async () => {
  const response = await api.get("/countries/");
  return response.data;
};

const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
};

export default useCountries;
