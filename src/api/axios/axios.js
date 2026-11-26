// import axios from "axios";

// const api = axios.create({
//     baseURL: "https://fakestoreapi.com",
// });

// export default api;



import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:5000/api",
  // baseURL: "https://api.testingapis.com/api",
  // baseURL: "https://worldfactbook.io/api/v1",
});

export default api;