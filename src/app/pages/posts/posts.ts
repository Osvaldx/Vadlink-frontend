import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PostFormat } from '../../interfaces/post-format';
import { PostsService } from '../../services/posts-service';
import { AsyncPipe } from '@angular/common';
import { CustomPost } from "../../components/custom-post/custom-post";
import { UserData } from '../../interfaces/user-data';
import { Auth } from '../../services/auth';
import { PostForm } from "../../components/post-form/post-form";

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, CustomPost, PostForm],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit{

  public posts$!: Observable<PostFormat[]>;
  public postsLen: number = 0;
  public user!: UserData;
  public limit = 5;
  public offset = 0;
  public loading = true;
  public totalPosts!: number;
  public loadedPosts: number = 0;

  constructor(private readonly postsService: PostsService, private readonly authService: Auth) { }

  ngOnInit(): void {
    const userOrNull = this.authService.currentUser();
    if(userOrNull) {
      this.user = userOrNull;
    }

    this.loadPosts(false);
    this.posts$ = this.postsService.getPostsObservable();
    this.postsService.getPostsObservable().subscribe(lista => {
      this.postsLen = lista.length;
    })
    
    this.postsService.getTotalObservable().subscribe(total => {
      this.totalPosts = total;
    })
  }

  private loadPosts(append: boolean) {
    this.loading = true;
    this.postsService.getPostsLocal({ date: 'desc', limit: this.limit, offset: this.offset }, append);
    this.loadedPosts += this.limit;
    this.loading = false;
  }

  public loadMore() {
    if(this.loadMoreDisabled()) return;

    this.offset += this.limit;
    this.loadPosts(true);
  }

  public loadMoreDisabled() {
    return (this.totalPosts === this.postsLen);
  }

  public FilterPosts(e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value;
    const [tipo, a] = value.split('-');

    const ascOrDesc = (a == 'asc') ? 'asc' : 'desc'

    this.offset = 0;

    switch(tipo) {
      case 'date':
        this.postsService.getPostsLocal({ date: ascOrDesc, limit: this.limit, offset: this.offset }, false);
        break;
      case 'like':
        this.postsService.getPostsLocal({ likes: ascOrDesc, limit: this.limit, offset: this.offset }, false);
        break;
    }
  }

}
