import { IUser } from "../model/user";

export interface GetUserDetailResponse {
    code: number
    message: string
    data: {
        user: IUser
    }
}