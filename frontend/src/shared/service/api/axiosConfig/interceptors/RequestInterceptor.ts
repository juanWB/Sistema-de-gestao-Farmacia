import type { InternalAxiosRequestConfig } from "axios";


export const requestInterceptor = (request: InternalAxiosRequestConfig) => {
    const token = localStorage.getIte(LOCAL_STORAGE_KEY_ACCESS_TOKEN!);

    if(token){
        request.headers = request.headers ?? {};
        request.headers['Authorization'] = `Bearer ${token}`
    }

    return request;
}