import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-5f772.firebaseio.com/'
});

export default instance;