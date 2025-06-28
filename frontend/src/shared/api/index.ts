import axios from 'axios';
import { responseInterceptor,  errorInterceptor } from './interceptors';
import { Enviroments } from '../enviroments';

const Api = axios.create({
    baseURL: Enviroments.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
)


export { Api };