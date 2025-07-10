import axios from './httpRequester';

const path = '/cart';
export const addItem = itemId => {
    return axios.post('/cart', { itemId }).catch(e => e.response);
}

export const getItems = () => {
    return axios.get('/cart').catch(e => e.response);
}

export const removeItem = (cartId) => {
  return axios.delete(`${path}/${cartId}`).catch((e) => e.response);
};
export const removeAll = () => {
    return axios.delete('/cart').catch(e => e.response);
};
