import { StatsTimelineData } from "./stats-timeline-data";

export interface StatsCommentsTimelineResponse {
    from: string;
    to: string;
    data: StatsTimelineData[];
}