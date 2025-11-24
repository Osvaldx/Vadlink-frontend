import { StatsPostsCommentsData } from "./stats-posts-comments-data";

export interface StatsPostsCommentsResponse {
    from: string;
    to: string;
    data: StatsPostsCommentsData[];
}