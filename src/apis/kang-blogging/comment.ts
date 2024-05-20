import { GetBlogCommentsRequest } from "../../interfaces/request/comment_request";
import { GetBlogCommentsResponse } from "../../interfaces/response/comment_response";
import axiosClient from "./axios_client";

const ApiComment = {
    getBlogComments: (params: GetBlogCommentsRequest)=>{
        const url = '/api/v1/comment';
        return axiosClient.get<GetBlogCommentsResponse>(url, {params: params})
     },
}


export default ApiComment