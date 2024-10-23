import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxButtonModule} from "devextreme-angular";

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
  @Input() delete !: () => void
  @Input() edit !: () => void

  onDelete() {
    this.delete()
  }
  onEdit() {
    this.edit()
  }
}
