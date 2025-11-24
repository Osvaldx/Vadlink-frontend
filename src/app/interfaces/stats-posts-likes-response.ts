import { StatsPostsLikesData } from "./stats-posts-likes-data";

export interface StatsPostsLikesResponse {
    from: string;
    to: string;
    data: StatsPostsLikesData[];
}