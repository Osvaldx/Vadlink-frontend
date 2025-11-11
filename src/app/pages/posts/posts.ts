import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostFormat } from '../../interfaces/post-format';
import { PostsService } from '../../services/posts-service';
import { AsyncPipe } from '@angular/common';
import { CustomPost } from "../../components/custom-post/custom-post";
import { UserData } from '../../interfaces/user-data';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-posts',
  imports: [AsyncPipe, CustomPost],
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

}
