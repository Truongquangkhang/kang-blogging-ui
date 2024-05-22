import { GetUserDetailResponse } from "../../interfaces/response/user_response";
import axiosClient from "./axios_client";

const ApiUser = {
    getUserDetail: (user_id: string)=>{
        const url = `/api/v1/user/${user_id}`;
        return axiosClient.get<GetUserDetailResponse>(url)
     },
}


export default ApiUser