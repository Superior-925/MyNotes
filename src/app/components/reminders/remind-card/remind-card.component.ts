import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CardItemComponent } from '../../../shared';
import { Remind, Tag } from '../../../models';
import { TagsServiceService } from '../../../service/tags-service.service';

@Component({
  selector: 'app-remind-card',
  standalone: true,
  imports: [DatePipe, CardItemComponent, CommonModule],
  templateUrl: './remind-card.component.html',
  styleUrl: './remind-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindCardComponent implements OnInit {
  @Input() remind!: Remind;
  @Input() deleteParentFunc!: (id: number) => void;
  @Input() editParentFunc!: (remind: Remind) => void;

  public tags: Tag[] = [];

  constructor(private tagsService: TagsServiceService) {}

  public ngOnInit(): void {
    this.tagsService.getAll().subscribe((tags: Tag[]) => {
      this.tags = tags;

      if (this.remind && this.remind.tags) {
        // Промежуточный шаг: преобразуем теги в remind в соответствующие теги из загруженного списка или в undefined
        const updatedTags: (Tag | undefined)[] = this.remind.tags.map((remindTag) => tags.find((tag) => tag.id === remindTag.id));

        // Финальный шаг: фильтруем undefined значения и приводим результат к типу Tag[]
        this.remind.tags = updatedTags.filter((tag): tag is Tag => tag !== undefined);
      }
    });
  }

  public onDelete = (): void => {
    this.deleteParentFunc(this.remind.id);
  };

  public onEdit = (): void => {
    this.editParentFunc(this.remind);
  };
}
