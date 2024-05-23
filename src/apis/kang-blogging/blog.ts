import { CreateBlogRequest, GetBlogsRequest } from "../../interfaces/request/blog_request";
import { CreateBlogResponse, GetBlogByID, GetBlogsResponse } from "../../interfaces/response/blog_response";
import axiosClient from "./axios_client";

const ApiBlog = {
    getBlogs: (params: GetBlogsRequest)=>{
        const url = '/api/v1/blog';
        return axiosClient.get<GetBlogsResponse>(url, {params: params})
     },
    getBlogById:(id: string) => {
        const url = `/api/v1/blog/${id}`;
        return axiosClient.get<GetBlogByID>(url)
    },
    createBlog: (params: CreateBlogRequest, access_token: string) =>{
        const url = '/api/v1/create-blog';
        return axiosClient.post<CreateBlogResponse>(url, params, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }, )
    }

}


export default ApiBlog