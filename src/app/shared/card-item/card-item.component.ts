import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DxButtonModule} from "devextreme-angular";
import {Remind} from "../../models/remind";
import {DisplayableItem} from "../../models/DisplayableItem";

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
  @Input() item!: DisplayableItem;
  @Input() delete !: () => void
  @Input() edit !: () => void

  onDelete = ():void => {
    this.delete()
  }
  onEdit =():void => {
    this.edit()
  }
}
