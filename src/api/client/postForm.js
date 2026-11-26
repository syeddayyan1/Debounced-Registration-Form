// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";

// const postForm = async (data) => {
//   const response = await axios.post("https://httpbin.org/post",data);
//   return response.data;
// };

// const usePostForm = () => {
//   return useMutation({
//     mutationFn: postForm,
//   });
// };

// export default usePostForm;




import { useMutation } from "@tanstack/react-query";
import api from "../axios/axios";

export default function PostForm() {
  const { mutate, data, isSuccess, isPending, isError, error } = useMutation({
      mutationFn: (data) => api.post("/echo", data),
      onError: (err) => {
          console.log("post form error: ", err)
      }
  });

return {
    mutate,
    data: data?.data,
    isSuccess,
    isPending,
    isError,
    error,
  };
}

