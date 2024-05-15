import { GetBlogsRequest } from "../../interfaces/request/blog_request";
import { GetBlogsResponse } from "../../interfaces/response/blog_response";
import axiosClient from "./axios_client";

const ApiBlog = {
    getBlogs: (params: GetBlogsRequest)=>{
        const url = '/api/v1/blog';
        return axiosClient.get<GetBlogsResponse>(url, {params: params})
     },
}


export default ApiBlog