import { CreateBlogCommentRequest, GetBlogCommentsRequest } from "../../interfaces/request/comment_request";
import { CreateBlogCommentResponse, GetBlogCommentsResponse } from "../../interfaces/response/comment_response";
import axiosClient from "./axios_client";

const ApiComment = {
    getBlogComments: (params: GetBlogCommentsRequest)=>{
        const url = `/api/v1/blog/${params.blog_id}/comment`;
        return axiosClient.get<GetBlogCommentsResponse>(url, {params: params})
     },
    createBlogComment: (params: CreateBlogCommentRequest, blog_id: string, access_token: string)=>{
        const url = `/api/v1/blog/${blog_id}/comment`
        return axiosClient.post<CreateBlogCommentResponse>(url,params, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        },)
    }
}


export default ApiComment