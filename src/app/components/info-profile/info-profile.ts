import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-profile',
  imports: [DatePipe],
  templateUrl: './info-profile.html',
  styleUrl: './info-profile.css',
})
export class InfoProfile {

  @Input() title!: string;
  @Input() data!: string | Date | number | undefined;
  @Input() isDate: boolean = false;

  constructor() {}

}
