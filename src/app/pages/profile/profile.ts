import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserData } from '../../interfaces/user-data';
import { NgIcon } from '@ng-icons/core';
import { CustomPost } from "../../components/custom-post/custom-post";
import { InfoProfile } from '../../components/info-profile/info-profile';
import { PostsService } from '../../services/posts-service';
import { PostFormat } from '../../interfaces/post-format';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgIcon, CustomPost, InfoProfile, AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit{

  public data!: UserData | null;
  public create_at!: Date;
  public dateofbirth!: Date;

  public posts$!: Observable<PostFormat[]>

  constructor(private readonly authService: Auth, private readonly postsService: PostsService) { }

  ngOnInit(): void {
    if(this.authService.currentUser()) {
      this.data = this.authService.currentUser();
      this.create_at = new Date(this.data?.createDate!);
      this.dateofbirth = new Date(this.data?.dateofbirth!);
    }
    
    this.getPosts();
    this.posts$ = this.postsService.getPostsObservable();
  }

  public getPosts() {
    this.postsService.getPostsLocal({ username: this.data?.username }, false);
  }

  public postDeleted(id: string) {
    this.postsService.postDeletedLocal(id);
  }

}
