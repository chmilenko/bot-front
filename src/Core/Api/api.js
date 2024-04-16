import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API ,
  withCredentials: false,
});

const Api = {
    getModelsByMark() {
      return instance.get(`/sneakers/mark`);
    },
    getAllSneakers() {
      return instance.get(`/sneakers`)
    },
    getModelById(id) {
      return instance.get(`/sneakers/${id}`)
    },
    postOrder(data) {
      return instance.post(`/orders`, {
        body: {data: data}
      })
    }
  };

export default Api;
