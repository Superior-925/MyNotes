import {Component, Input} from '@angular/core';
import {DxButtonModule} from "devextreme-angular";

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [
    DxButtonModule
  ],
  templateUrl: './section-wrapper.component.html',
  styleUrl: './section-wrapper.component.css'
})
export class SectionWrapperComponent {
  @Input() callbackFunction!: () => void;
}
