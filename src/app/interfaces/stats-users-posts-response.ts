import { StatsUsersPostsData } from "./stats-users-posts-data";

export interface StatsUsersPostsResponse {
    from: string;
    to: string;
    data: StatsUsersPostsData[];
}