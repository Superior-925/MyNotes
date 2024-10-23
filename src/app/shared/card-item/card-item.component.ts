import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxButtonModule} from "devextreme-angular";
import {Remind} from "../../models/remind";

@Component({
  selector: 'app-card-item',
  standalone: true,
    imports: [
        DxButtonModule
    ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  /* @Output() *название метода* = new EventEmitter<>()*/
  /* (click) = emitEvent()*/
  @Input() remind!: Remind;
  @Input() delete !: () => void
  @Input() edit !: () => void

  onDelete = ():void => {
    this.delete()
  }
  onEdit =():void => {
    this.edit()
  }
}
