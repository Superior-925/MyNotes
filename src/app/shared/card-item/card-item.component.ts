import { Component, Input } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { DisplayableItem } from '../../models/DisplayableItem';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [DxButtonModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css',
})
export class CardItemComponent {
  @Input() item!: DisplayableItem;
  @Input() delete!: () => void;
  @Input() edit!: () => void;

  public onDelete = (): void => {
    this.delete();
  };

  public onEdit = (): void => {
    this.edit();
  };
}
