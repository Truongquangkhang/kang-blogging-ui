import { UpdateUserRequest } from './../../interfaces/request/user_request';
import { GetUsersRequest } from "../../interfaces/request/user_request";
import { FollowUserResponse, GetUserDetailResponse, GetUsersResponse, UpdateUserResponse } from "../../interfaces/response/user_response";
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
    updateUser: (user_id: string, params: UpdateUserRequest) => {
        const url = `/api/v1/user/${user_id}`;
        return axiosClient.patch<UpdateUserResponse>(url, params)
    },
    followUser: (user_id: string) => {
        const url = `/api/v1/user/${user_id}/follow`;
        return axiosClient.post<FollowUserResponse>(url)
    },
    unfollowUser: (user_id: string) => {
        const url = `/api/v1/user/${user_id}/follow`;
        return axiosClient.delete<FollowUserResponse>(url)
    } 
}


export default ApiUser