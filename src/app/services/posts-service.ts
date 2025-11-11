import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostFormat } from '../interfaces/post-format';
import { Observable } from 'rxjs';
import { MessageManager } from './message-manager';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private postURL = 'https://vadlink-backend.vercel.app/posts';

  constructor(private http: HttpClient, private msgManager: MessageManager) { }

  public findAllPostsWithUsername(username: string): Observable<PostFormat[]> {
    return this.http.get<PostFormat[]>(this.postURL + `?username=${username}&limit=3`);
  }

  public addLikePost(post_id: string) {
    this.http.post(this.postURL + `/like/${post_id}`, {}).subscribe({
      next: () => {
        this.msgManager.add('success', 'Se registro el like en la publicación', 2);
        console.log("q");
      },
      error: (err) => {
        this.msgManager.add('error', 'No se pudo registrar el like', 2);
        console.log(err);
      }
    })
  }

  public removeLikePost(post_id: string) {
    this.http.post(this.postURL + `/removeLike/${post_id}`, {}).subscribe({
      next: () => {
        this.msgManager.add('success', 'Se saco el like de la publicación', 2);
      },
      error: () => {
        this.msgManager.add('error', 'No se pudo sacar el like de la publicación', 2);
      }
    })
  }

  public deletePost(post_id: string) {
    this.http.delete(this.postURL + `/${post_id}`).subscribe({
      next: () => {
        this.msgManager.add('success', 'Publicación eliminada!', 2);
      },
      error: (err) => {
        this.msgManager.add('error', 'No se pudo eliminar la publicación', 2);
        console.log(err);
      }
    })
  }
  
}
