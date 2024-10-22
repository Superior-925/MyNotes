import {Component, Input} from '@angular/core';
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
  @Input() onDelete: () => void;
  @Input() onEdit: () => void;
}
