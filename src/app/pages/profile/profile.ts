import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserData } from '../../interfaces/user-data';
import { NgIcon } from '@ng-icons/core';
import { CustomPost } from "../../components/custom-post/custom-post";
import { InfoProfile } from '../../components/info-profile/info-profile';
import { PostsService } from '../../services/posts-service';
import { PostFormat } from '../../interfaces/post-format';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private postsSubject = new BehaviorSubject<PostFormat[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(private readonly authService: Auth, private readonly postsService: PostsService) { }

  ngOnInit(): void {
    if(this.authService.currentUser()) {
      this.data = this.authService.currentUser();
      this.create_at = new Date(this.data?.createDate!);
      this.dateofbirth = new Date(this.data?.dateofbirth!);
    }
    
    this.getPosts();
  }

  public getPosts() {
    if(this.data) {
      this.postsService.findAllPostsWithUsername(this.data.username).subscribe(posts => {
        this.postsSubject.next(posts);
      })
    }
  }

  public postDeleted(id: string) {
    const updated = this.postsSubject.value.filter(p => p._id != id);
    this.postsSubject.next(updated); 
  }

}
