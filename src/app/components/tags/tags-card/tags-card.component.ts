import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tag } from '../../../models';
import { CardItemComponent } from '../../../shared';

@Component({
  selector: 'app-tags-card',
  standalone: true,
  imports: [CardItemComponent],
  templateUrl: './tags-card.component.html',
  styleUrl: './tags-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsCardComponent {
  @Input() tag!: Tag; // Добавляем список всех тегов
  @Input() deleteParentFunc!: (tag: Tag) => void;
  @Input() editParentFunc!: (tag: Tag) => void;

  public onDelete = (): void => {
    this.deleteParentFunc(this.tag);
  };

  public onEdit = (): void => {
    this.editParentFunc(this.tag);
  };
}
