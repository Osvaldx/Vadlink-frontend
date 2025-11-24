import { Component, Input } from '@angular/core';
import { InfovalorPipe } from '../../pipes/infovalor-pipe';

@Component({
  selector: 'app-info-profile',
  imports: [InfovalorPipe],
  templateUrl: './info-profile.html',
  styleUrl: './info-profile.css',
})
export class InfoProfile {

  @Input() title!: string;
  @Input() data!: string | Date | number | undefined;
  @Input() isDate: boolean = false;

  constructor() {}

}
