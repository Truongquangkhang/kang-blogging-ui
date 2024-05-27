import { GetUsersRequest } from "../../interfaces/request/user_request";
import { GetUserDetailResponse, GetUsersResponse } from "../../interfaces/response/user_response";
import axiosClient from "./axios_client";

const ApiUser = {
    getUsers: (params: GetUsersRequest) =>{
        const url = `/api/v1/user`;
        return axiosClient.get<GetUsersResponse>(url, {params: params})
    },
    getUserDetail: (user_id: string)=>{
        const url = `/api/v1/user/${user_id}`;
        return axiosClient.get<GetUserDetailResponse>(url)
     },
}


export default ApiUser