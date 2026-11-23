import { useQuery } from "@tanstack/react-query";
 import api from "../axios/axios";



const getPorducts = async () => {
    const response = await api.get("/products")
    return response.data;
};


const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getPorducts(),
    });
};

export default useProducts;