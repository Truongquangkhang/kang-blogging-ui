export interface GetBlogsRequest {
    page: number
    pageSize: number
    searchBy?: string
    searchName?: string
    authorIds?: string
    categoryIds?: string
}

export interface CreateBlogRequest {
    name: string,
    description: string
    category_ids: string[]
    thumbnail?: string | null
    content?: string | null
}
