import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostFormat } from '../interfaces/post-format';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageManager } from './message-manager';
import { FindAllParams } from '../interfaces/find-all-params';
import { GetPostsFormat } from '../interfaces/get-posts-format';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private apiUrl = 'https://vadlink-backend.vercel.app/posts';
  // private apiUrl = 'http://localhost:3000/posts';

  private postsSubject = new BehaviorSubject<PostFormat[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private msgManager: MessageManager) { }

  public findAllPosts(params: FindAllParams): Observable<GetPostsFormat> {
    let query = this.apiUrl + '?';

    if(params.username) {
      query += `&username=${params.username}`;
    }
    
    if(params.likes) {
      query += `&likes=${params.likes}`;
    }

    if(params.date) {
      query += `&date=${params.date}`;
    }
    
    if(params.offset) {
      query += `&offset=${params.offset}`;
    }
    
    if(params.limit) {
      query += `&limit=${params.limit}`;
    }
    return this.http.get<GetPostsFormat>(query);
  }

  public addLikePost(post_id: string) {
    this.http.post(this.apiUrl + `/like/${post_id}`, {}).subscribe({
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
    this.http.post(this.apiUrl + `/removeLike/${post_id}`, {}).subscribe({
      next: () => {
        this.msgManager.add('success', 'Se saco el like de la publicación', 2);
      },
      error: () => {
        this.msgManager.add('error', 'No se pudo sacar el like de la publicación', 2);
      }
    })
  }

  public deletePost(post_id: string) {
    this.http.delete(this.apiUrl + `/${post_id}`).subscribe({
      next: () => {
        this.msgManager.add('success', 'Publicación eliminada!', 2);
      },
      error: (err) => {
        this.msgManager.add('error', 'No se pudo eliminar la publicación', 2);
        console.log(err);
      }
    })
  }

  public getPostsLocal(params: FindAllParams, append: boolean) {
    this.findAllPosts(params).subscribe(response => {
      if (append) {
        const updated = [...this.postsSubject.value, ...response.posts];
        this.postsSubject.next(updated);
        this.totalSubject.next(response.total);
      } else {
        this.postsSubject.next(response.posts);
        this.totalSubject.next(response.total);
      }
    });
  }

  public postDeletedLocal(id: string) {
    const updated = this.postsSubject.value.filter(p => p._id != id);
    this.postsSubject.next(updated); 
    this.totalSubject.next(this.totalSubject.value - 1);
  }

  public getPostsObservable() {
    return this.postsSubject.asObservable();
  }

  public createPost(body: FormData) {
    this.http.post<PostFormat>(this.apiUrl, body).subscribe({
      next: (post) => {
        console.log(post);
        this.createPostLocal(post);
        this.msgManager.add('success', 'Se publico correctamente!', 2);
      },
      error: (err) => {
        console.log(err);
        this.msgManager.add('error', 'No se pudo publicar la publicación', 2);
      }
    })
  }

  public createPostLocal(post: PostFormat) {
    const updated = [post, ...this.postsSubject.value];
    this.postsSubject.next(updated);
    this.totalSubject.next(this.totalSubject.value + 1);
  }

  public getTotalObservable() {
    return this.totalSubject.asObservable();
  }
  
}
