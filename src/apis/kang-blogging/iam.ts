import { ILoginRequest } from "../../interfaces/request/kang-blogging";
import axiosClient from "./axios_client";

const ApiIam = {
    login: (data: ILoginRequest)=>{
       const url = '/api/v1/iam/login';
       return axiosClient.post(url, data)
    },
    register: (data: any)=>{
        const url= '/api/v1/iam/register';
        return axiosClient.post(url, data)
    } 
}

export default ApiIam