import { CreateBlogCommentRequest, GetBlogCommentsRequest, GetCommentsByParamRequest, UpdateCommentRequest } from "../../interfaces/request/comment_request";
import { CreateBlogCommentResponse, DeleteCommentResponse, GetBlogCommentsResponse, GetCommentResponse, GetCommentsByParamResponse, UpdateCommentResponse } from "../../interfaces/response/comment_response";
import axiosClient from "./axios_client";

const ApiComment = {
    getBlogComments: (params: GetBlogCommentsRequest)=>{
        const url = `/api/v1/blog/${params.blog_id}/comment`;
        return axiosClient.get<GetBlogCommentsResponse>(url, {params: params})
     },
    createBlogComment: (params: CreateBlogCommentRequest, blog_id: string)=>{
        const url = `/api/v1/blog/${blog_id}/comment`
        return axiosClient.post<CreateBlogCommentResponse>(url,params)
    },
    getCommentsByParam: (params: GetCommentsByParamRequest) => {
        const url = `/api/v1/comment`
        return axiosClient.get<GetCommentsByParamResponse>(url, {params: params})
    },
    updateComment: (commentId: string, params: UpdateCommentRequest) => {
        const url = `/api/v1/comment/${commentId}`
        return axiosClient.patch<UpdateCommentResponse>(url, params)
    },
    deleteComment: (commentId: string) => {
        const url = `/api/v1/comment/${commentId}`
        return axiosClient.delete<DeleteCommentResponse>(url)
    },
    getComment: (commentId: string) => {
        const url = `/api/v1/comment/${commentId}`
        return axiosClient.get<GetCommentResponse>(url)
    },
}


export default ApiComment