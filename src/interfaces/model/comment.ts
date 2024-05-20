import { IUSerMetadata } from "./user_metadata"

export interface IComment {
    id: string
    content: string
    isToxicity: boolean
    createdAt: number
    updateAt: number
    user: IUSerMetadata
}

export interface ICommentWithReplies {
    comment: IComment
    replies: IComment[]
}