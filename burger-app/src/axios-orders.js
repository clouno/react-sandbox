import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-e7a35.firebaseio.com/'
});

export default instance;
