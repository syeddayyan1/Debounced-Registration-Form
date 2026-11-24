import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postForm = async (data) => {
  const response = await axios.post("https://httpbin.org/post",data);
  return response.data;
};

const usePostForm = () => {
  return useMutation({
    mutationFn: postForm,
  });
};

export default usePostForm;