import { Component, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-charts-template',
  imports: [],
  templateUrl: './charts-template.html',
  styleUrl: './charts-template.css',
})
export class ChartsTemplate {

  @Input() signalDisableOrEnable!: WritableSignal<boolean>;
  @Input() canvasIdChart!: string;
  @Input() titleChart!: string;

}
