export interface IUSerMetadata {
    id: string
    name: string
    email: string
    displayName: string
    totalBlogs: number
    gender: boolean
    avatar?: string
    description?: string | null
    totalComments?: number | 0
}