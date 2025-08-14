import axios from 'axios';
import { responseInterceptor,  errorInterceptor, requestInterceptor } from './interceptors';
import { Enviroments } from '../../../enviroments';

const Api = axios.create({
    baseURL: Enviroments.URL_BASE
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error)
)

Api.interceptors.request.use(
    (request) => requestInterceptor(request),
    (error) => errorInterceptor(error)
);


export { Api };