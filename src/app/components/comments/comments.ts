import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentFormat } from '../../interfaces/comment-format';
import { CommentsService } from '../../services/comments-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidateErrorsInput } from '../../directives/validate-errors-input';
import { NgIcon } from "@ng-icons/core";
import { UserData } from '../../interfaces/user-data';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule, ValidateErrorsInput, NgIcon],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class CommentsComponent implements OnInit {

  @Input() postId!: string;
  @Input() user!: UserData;
  @Output() commentAdded = new EventEmitter<void>();

  public comments: CommentFormat[] = [];
  public total = 0;
  public limit = 1;
  public offset = 0;
  public loading = false;
  public editingId: string | null = null;

  public commentForm = new FormGroup({
    text: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)])
  });

  public editForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100)
    ])
  });

  constructor(private commentsService: CommentsService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMore();
  }

  public isDisabled(): boolean {
    const c = this.commentForm.controls;

    const hasTextError = c.text.errors ? true : false;

    return hasTextError;
  }

  public loadMore() {
    if (this.loading) return;

    this.loading = true;
    this.cdr.detectChanges();

    this.commentsService.findComments(this.postId, { limit: this.limit, offset: this.offset }).subscribe(res => {
      this.total = res.total;
      this.comments.push(...res.comments);

      this.offset += this.limit;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }


  public create() {
    if (this.commentForm.errors) return;

    const text = this.commentForm.controls.text.value!;
    
    this.commentsService.createComment(this.postId, text).subscribe(c => {
      this.comments.unshift(c);
      this.total++;

      this.commentForm.reset();
      this.commentAdded.emit();
    });
  }

  public startEdit(c: CommentFormat) {
    this.editingId = c._id;
    this.editForm.controls.text.setValue(c.text);
  }
  
  public cancelEdit() {
    this.editingId = null;
    this.editForm.reset();
  }
  
  public saveEdit(commentId: string) {
    if (this.editForm.invalid) return;
  
    const newText = this.editForm.controls.text.value!;
  
    this.commentsService.updateComment(commentId, newText).subscribe(updated => {
      // actualizar en memoria
      const idx = this.comments.findIndex(cm => cm._id === commentId);
      if (idx !== -1) {
        this.comments[idx].text = updated.text;
        this.comments[idx].modified = true;
      }
  
      this.cancelEdit();
    });
  }
}