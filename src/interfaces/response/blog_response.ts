import { IBlogMetadata } from "../model/blog_metadata"
import { IPagination } from "../model/pagination"

export interface GetBlogsResponse {
    code: number
    message: string
    data: {
        blogs: IBlogMetadata[]
        pagination: IPagination
    }
}