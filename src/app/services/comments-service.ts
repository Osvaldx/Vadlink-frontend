import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsParams } from '../interfaces/comments-params';
import { FindCommentsFormat } from '../interfaces/find-comments-format';
import { CommentFormat } from '../interfaces/comment-format';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  public findComments(postId: string, filters: CommentsParams) {
    let query = this.apiUrl + `/${postId}?`;

    if(filters.limit) {
      query += `&limit=${filters.limit}`;
    }
    
    if(filters.offset) {
      query += `&offset=${filters.offset}`;
    }

    return this.http.get<FindCommentsFormat>(query);
  }

  public createComment(postId: string, text: string) {
    return this.http.post<CommentFormat>(this.apiUrl + `/add/${postId}`, { text });
  }

  public updateComment(commentId: string, text: string) {
    return this.http.put<CommentFormat>(this.apiUrl + `/update/${commentId}`, { text });
  }
  
}
