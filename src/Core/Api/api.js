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
    getSizes() {
    return instance.get('/sizes')
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
      ("ADADAL", formData);
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
    getStatuses() {
      return instance.get(`/statuses`)
    },
    getOrders() {
      return instance.get(`/orders`)
    },
    changeStatus(data) {
      return instance.put('/orders/status', data)
    },
    getTypesDelivery() {
      return instance.get('/types/delivery')
    },
  };

export default Api;
