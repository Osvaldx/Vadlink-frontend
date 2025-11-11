import { Component, OnInit } from '@angular/core';
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

  public posts$!: Observable<PostFormat[]>
  public user!: UserData;

  constructor(private readonly postsService: PostsService, private readonly authService: Auth) { }

  ngOnInit(): void {
    const userOrNull = this.authService.currentUser();
    if(userOrNull) {
      this.user = userOrNull;
    }

    this.postsService.getPostsLocal({ date: 'desc', limit: 10 });
    this.posts$ = this.postsService.getPostsObservable();
  }

  public FilterPosts(e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value;

    const [tipo, a] = value.split('-');

    const ascOrDesc = (a == 'asc') ? 'asc' : 'desc'

    switch(tipo) {
      case 'date':
        this.postsService.getPostsLocal({ date: ascOrDesc })
        break;
        case 'like':
        this.postsService.getPostsLocal({ likes: ascOrDesc })
        break;
    }
  }

}
