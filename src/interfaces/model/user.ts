import { IBlogMetadata } from './blog_metadata';
import { IUSerMetadata } from "./user_metadata";

export interface IUser {
    userInfo: IUSerMetadata;
    blogs: IBlogMetadata[];
} 