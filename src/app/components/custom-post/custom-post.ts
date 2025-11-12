import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { NgIcon } from "@ng-icons/core";
import { PostFormat } from '../../interfaces/post-format';
import { UserData } from '../../interfaces/user-data';
import { PostsService } from '../../services/posts-service';
import { Auth } from '../../services/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-custom-post',
  imports: [NgIcon, DatePipe],
  templateUrl: './custom-post.html',
  styleUrl: './custom-post.css',
})
export class CustomPost implements OnInit, OnChanges{

  @Input() post!: PostFormat;
  @Output() postDeleted = new EventEmitter<string>();
  
  public liked = signal<boolean>(false);
  public likeStyles = 'flex items-center gap-1 hover:text-red-400 transition-colors duration-200 cursor-pointer ';
  public user!: UserData;

  public showComments = signal<boolean>(false);
  public showImageFull = signal<boolean>(false);
  public showDeleteOptions = signal<boolean>(false);
  
  constructor(private readonly postService: PostsService, private readonly authService: Auth) {
  }
  
  ngOnInit(): void {
    const user = this.authService.currentUser()
    if(user) {
      this.user = user;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.liked.set(this.post.liked);
      console.log(this.liked());
    }
  }

  public toggleImageFull() {
    this.showImageFull.update(i => !i);
  }

  public openComments() {
    this.showComments.update(c => !c);
  }

  public addLikeorRemoveLike() {
    this.liked.update(l => !l);
  
    this.post.likes += this.liked() ? 1 : -1;
  
    if (this.liked()) {
      this.postService.addLikePost(this.post._id);
    } else {
      this.postService.removeLikePost(this.post._id);
    }
  }

  public showModal() {
    this.showDeleteOptions.update(d => !d);
  }

  public deletePost() {
    this.postService.postDeletedLocal(this.post._id);
    this.postService.deletePost(this.post._id);
    this.showDeleteOptions.set(false);
    this.postDeleted.emit(this.post._id);
  }

}
