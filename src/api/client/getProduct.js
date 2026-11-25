// import { useQuery } from "@tanstack/react-query";
//  import api from "../axios/axios";



// const getPorducts = async () => {
//     const response = await api.get("/products")
//     return response.data;
// };


// const useProducts = () => {
//     return useQuery({
//         queryKey: ["products"],
//         queryFn: () => getPorducts(),
//     });
// };

// export default useProducts;

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function getProducts() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => api.get("/products/"),
    });

    return {
        data: data ?.data,
        isError,
        isPending,
        error,
    }
}