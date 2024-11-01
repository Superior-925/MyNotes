import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {NgIf} from '@angular/common';
import {switchMap} from 'rxjs';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from 'devextreme-angular';
import {ActivatedRoute, Router} from '@angular/router';

import {RequestRemindService} from '../../../service/reminds-service.service';
import {TagsServiceService} from '../../../service/tags-service.service';
import {Remind, Tag} from '../../../models';
import {LoadingComponent} from '../../../shared';
import {DatesFormat} from "../../../shared/enums/dates-format.enum";

/**
 * Компонент редактирования напоминания.
 */
@Component({
  selector: 'app-remind-details',
  standalone: true,
  imports: [DxPopupModule, DxTextBoxModule, DxTextAreaModule, DxTagBoxModule, DxDateBoxModule, DxButtonModule, LoadingComponent, NgIf],
  templateUrl: './remind-details.component.html',
  styleUrl: './remind-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() remind!: Remind;

  public tags: Tag[] = [];
  public isPopupVisible = false;

  protected readonly DatesFormat = DatesFormat;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestRemindService,
    private router: Router,
    private tagsService: TagsServiceService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit() {
    this.activatedRoute.params.pipe(switchMap((params) => this.reqService.get(params['id']))).subscribe((res: Remind) => {
      this.remind = res;
      this.isPopupVisible = true;
      this.cdr.markForCheck();
    });

    this.tagsService.getAll().subscribe((tags) => {
      this.tags = tags;
      this.cdr.markForCheck();
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
