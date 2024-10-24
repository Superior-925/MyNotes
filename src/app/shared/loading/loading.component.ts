import {Component, Input} from '@angular/core';
import {DxLoadPanelModule} from "devextreme-angular";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    DxLoadPanelModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() visible: boolean = false;
}
