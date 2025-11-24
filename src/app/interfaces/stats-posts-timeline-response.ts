import { StatsTimelineData } from "./stats-timeline-data";

export interface StatsPostsTimelineResponse {
    from: string;
    to: string;
    data: StatsTimelineData[];
}