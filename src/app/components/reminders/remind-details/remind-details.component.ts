import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DxButtonModule, DxDateBoxModule, DxPopupModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { ActivatedRoute, Router } from '@angular/router';

import { RequestRemindService } from '../../../service/reminds-service.service';
import { TagsServiceService } from '../../../service/tags-service.service';
import { Remind, Tag } from '../../../models';

@Component({
  selector: 'app-remind-details',
  standalone: true,
  imports: [DxPopupModule, DxTextBoxModule, DxTextAreaModule, DxTagBoxModule, DxDateBoxModule, DxButtonModule],
  templateUrl: './remind-details.component.html',
  styleUrl: './remind-details.component.scss',
})
export class RemindDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() remind!: Remind;

  public tags: Tag[] = [];
  public isPopupVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestRemindService,
    private router: Router,
    private tagsService: TagsServiceService,
  ) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.reqService.get(params['id']).subscribe((res: Remind) => {
        this.remind = res;
        this.isPopupVisible = true;
      });
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
    });
  }

  public save(): void {
    // Сначала получаем текущие выбранные ID тегов из remind
    const selectedTagIds = this.remind.tags.map((tag) => tag.id);

    // Затем находим полные объекты тегов, соответствующие этим ID
    const selectedTags = this.tags.filter((tag) => selectedTagIds.includes(tag.id));

    // Обновляем remind с полными объектами тегов
    const updatedRemind: Remind = {
      ...this.remind,
      tags: selectedTags,
    };

    this.reqService.update(updatedRemind).subscribe(() => {
      this.router.navigate(['reminders']);
      this.closePopup();
    });
  }

  private closePopup(): void {
    this.isPopupVisible = false;
    this.close.emit();
    this.router.navigate(['reminders']);
  }
}
