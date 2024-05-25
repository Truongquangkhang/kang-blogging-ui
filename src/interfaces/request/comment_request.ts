export interface GetBlogCommentsRequest {
    page: number
    pageSize: number
    blog_id: string
}

export interface CreateBlogCommentRequest {
    content: string
    reply_comment_id?: string | null
}
