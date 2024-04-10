import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API,
  withCredentials: false,
});
console.log(import.meta.env.TOKEN);
const Api = {
  getAllModels() {
    return instance.get("/models?populate=*", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_TOKEN}`,
      },
    });
  },
};

export default Api;