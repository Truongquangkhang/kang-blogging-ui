import { ICommentWithReplies } from "../model/comment"
import { IPagination } from "../model/pagination"

export interface GetBlogCommentsResponse {
    code: number
    message: string
    data: {
        comments: ICommentWithReplies[]
        pagination: IPagination
    }
}
