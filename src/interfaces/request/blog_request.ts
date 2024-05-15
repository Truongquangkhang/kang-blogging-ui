export interface GetBlogsRequest {
    page: number
    pageSize: number
    searchBy?: string
    searchName?: string
    authorIds?: string
    categoryIds?: string
}
