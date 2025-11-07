import { Component, Input } from '@angular/core';
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

}
