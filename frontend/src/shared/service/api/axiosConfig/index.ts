import axios from 'axios';
import { responseInterceptor,  errorInterceptor, requestInterceptor } from './interceptors';

const Api = axios.create({
    baseURL: process.env.URL_BASE
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