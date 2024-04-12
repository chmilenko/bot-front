import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API,
  withCredentials: false,
});

const Api = {
    getModelsByMark(markName) {
      return instance.get(`/models?populate=*&filters[mark][Name][$eq]=${markName}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_TOKEN}`,
        },
      });
    },
    getMarks() {
      return instance.get(`/marks`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_TOKEN}`,
        },
      })
    },
    getModelById(id) {
      return instance.get(`/models/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_TOKEN}`,
        },
      })
    },
    postOrder() {

    }
  };

export default Api;
