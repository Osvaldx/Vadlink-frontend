import { PostUser } from "./post-user";

export interface PostFormat {
    _id: string;
    title: string;
    description?: string;
    url_img?: string;
    url_img_id?: string;
    likes: number;
    shared: number;
    user_id: PostUser;
    likedBy: string[];
    commentsCount: number;
    liked: boolean;
    isDeleted: boolean;
    created_at: Date;
    __v: number;
}
