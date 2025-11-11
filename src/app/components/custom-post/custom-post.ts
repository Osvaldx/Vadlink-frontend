import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NgIcon } from "@ng-icons/core";
import { PostFormat } from '../../interfaces/post-format';
import { UserData } from '../../interfaces/user-data';
import { PostsService } from '../../services/posts-service';

@Component({
  selector: 'app-custom-post',
  imports: [NgIcon],
  templateUrl: './custom-post.html',
  styleUrl: './custom-post.css',
})
export class CustomPost implements OnInit{

  @Input() user!: UserData;
  @Input() post!: PostFormat;
  @Output() postDeleted = new EventEmitter<string>();
  
  public liked!: boolean;
  public likeStyles = 'flex items-center gap-1 hover:text-red-400 transition-colors duration-200 cursor-pointer ';

  public showComments = signal<boolean>(false);
  public showImageFull = signal<boolean>(false);
  public showDeleteOptions = signal<boolean>(false);
  
  constructor(private readonly postService: PostsService) {
  }
  
  ngOnInit(): void {
    this.liked = (this.post.likedBy.includes(this.user._id));
  }

  public toggleImageFull() {
    this.showImageFull.update(i => !i);
  }

  public openComments() {
    this.showComments.update(c => !c);
  }

  public addLikeorRemoveLike() {
    this.liked = !this.liked;
  
    this.post.likes += this.liked ? 1 : -1;
  
    if (this.liked) {
      this.postService.addLikePost(this.post._id);
    } else {
      this.postService.removeLikePost(this.post._id);
    }
  }

  public showModal() {
    this.showDeleteOptions.update(d => !d);
  }

  public deletePost() {
    this.postService.deletePost(this.post._id);
    this.showDeleteOptions.set(false);
    this.postDeleted.emit(this.post._id);
  }

}
