import type { AxiosResponse } from "axios";


export const responseInterceptor = (response: AxiosResponse) => {
    return response;
}