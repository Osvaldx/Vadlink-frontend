import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatsUsersPostsResponse } from '../interfaces/stats-users-posts-response';
import { StatsCommentsResponse } from '../interfaces/stats-comments-response';
import { StatsPostsCommentsResponse } from '../interfaces/stats-posts-comments-response';
import { StatsPostsTimelineResponse } from '../interfaces/stats-posts-timeline-response';
import { StatsCommentsTimelineResponse } from '../interfaces/stats-comments-timeline-response';
import { StatsPostsLikesResponse } from '../interfaces/stats-posts-likes-response';

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  private apiUrl = 'https://vadlink-backend.vercel.app/stats';
  // private apiUrl = 'http://localhost:3000/stats';

  constructor(private readonly http: HttpClient) {}

  private buildQuery(path: string, from: string, to: string): string {
    return `${this.apiUrl}${path}?from=${from}&to=${to}`;
  }

  public getUsersPostsStats(from: string, to: string) {
    return this.http.get<StatsUsersPostsResponse>(
      this.buildQuery('/users/posts', from, to)
    );
  }

  public getCommentsStats(from: string, to: string) {
    return this.http.get<StatsCommentsResponse>(
      this.buildQuery('/comments', from, to)
    );
  }

  public getPostsCommentsStats(from: string, to: string) {
    return this.http.get<StatsPostsCommentsResponse>(
      this.buildQuery('/posts/comments', from, to)
    );
  }

  public getPostsTimeline(from: string, to: string) {
    return this.http.get<StatsPostsTimelineResponse>(
      this.buildQuery('/posts/timeline', from, to)
    );
  }

  public getCommentsTimeline(from: string, to: string) {
    return this.http.get<StatsCommentsTimelineResponse>(
      this.buildQuery('/comments/timeline', from, to)
    );
  }

  public getPostsLikes(from: string, to: string) {
    return this.http.get<StatsPostsLikesResponse>(
      this.buildQuery('/posts/likes', from, to)
    );
  }
}
