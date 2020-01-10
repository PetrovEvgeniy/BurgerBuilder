import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-king-5c64d.firebaseio.com'
})

export default instance;