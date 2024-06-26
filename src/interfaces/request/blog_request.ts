export interface GetBlogsRequest {
    page: number
    pageSize: number
    searchBy?: string | null
    searchName?: string | null
    authorIds?: string | null
    categoryIds?: string | null
    sortBy?: string | null
    published?: boolean | null
    isDeprecated?: boolean | null
    getRelevant?: boolean | null
}

export interface CreateBlogRequest {
    name: string,
    description: string
    category_ids: string[]
    thumbnail?: string | null
    content?: string | null
}

export interface UpdateBlogRequest {
    name?: string | null
    thumbnail?: string | null
    content?: string | null
    categoryIds?: string[] | null
    published?: boolean | null
}
