import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API ,
  withCredentials: false,
});

const Api = {
    authenication(data) {
      return instance.post('/authenication', {
        data
      })
    },
    checkToken(token) {
      return instance.post('/token', {
        token
      })
    },
    getModelsByMark() {
      return instance.get(`/sneakers/mark`);
    },
    getAllSneakers(mark) {
      return instance.get(`/sneakers?mark=${mark ? mark : ''}`)
    },
    getModelById(id) {
      return instance.get(`/sneakers/${id}`)
    },
    addNewSneakers(data) {
      return instance.post(`/sneakers`, {
       data
      })
    },
    addPhotoSneakers(id, formData) {
      console.log("ADADAL", formData);
      return instance.post(`/sneakers/photos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
    },
    postOrder(data) {
      return instance.post(`/orders`, {
        data
       })
    },
    getOrders() {
      return instance.get(`/orders`)
    }
  };

export default Api;
