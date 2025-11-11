export interface PostFormat {
    _id: string;
    title: string;
    description?: string;
    url_img?: string;
    url_img_id?: string;
    likes: number;
    shared: number;
    user_id: string;
    username: string;
    likedBy: string[];
    isDeleted: boolean;
    created_at: Date;
    __v: number;
}
