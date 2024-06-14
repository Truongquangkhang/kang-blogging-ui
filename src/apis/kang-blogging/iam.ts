import { IChangePasswordRequest, ILoginRequest, IRegisterRequest } from "../../interfaces/request/iam_request";
import { IChangePasswordResponse, ILoginResponse, IRefreshTokenResponse } from "../../interfaces/response/iam_response";
import axiosClient from "./axios_client";

const ApiIam = {
    login: (data: ILoginRequest)=>{
       const url = '/api/v1/iam/login';
       return axiosClient.post<ILoginResponse>(url, data)
    },
    register: (data: IRegisterRequest)=>{
        const url= '/api/v1/iam/register';
        return axiosClient.post(url, data)
    },
    checkExistUsername: (username: string)=>{
        const url= `/api/v1/iam/check-exist-username?username=${username}`;
        return axiosClient.get(url)
    },
    refreshToken: () => {
        const url = `/api/v1/iam/refresh-access-token`
        return axiosClient.post<IRefreshTokenResponse>(url)
    },
    changePassword: (params: IChangePasswordRequest) => {
        const url = `/api/v1/iam/change-password`
        return axiosClient.post<IChangePasswordResponse>(url, params)
    }

}

export default ApiIam