import { Component, Input, signal } from '@angular/core';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-custom-post',
  imports: [NgIcon],
  templateUrl: './custom-post.html',
  styleUrl: './custom-post.css',
})
export class CustomPost {

  @Input() firstName!: string;
  @Input() lastName!: string;
  @Input() username!: string;
  @Input() avatar!: string;
  @Input() comment!: string;
  @Input() foto!: string;

  public showComments = signal<boolean>(false);

  public openComments() {
    this.showComments.update(c => !c);
  }

}
