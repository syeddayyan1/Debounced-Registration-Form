
import api from "../axios/axios";
import { useQuery } from "@tanstack/react-query";


export default function getForm() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["forms"],
        queryFn: () => api.get("/form"),
    });

    return { 
        data: data?.data?.data,
        isLoading,
        isError,
        error,
    }
}