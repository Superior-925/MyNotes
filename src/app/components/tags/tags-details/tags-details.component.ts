import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { DxButtonModule, DxDateBoxModule, DxPopupModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { ActivatedRoute, Router } from '@angular/router';

import { Tag } from '../../../models';
import { TagsServiceService } from '../../../service/tags-service.service';
import { RequestRemindService } from '../../../service/reminds-service.service';
import { LoadingComponent } from '../../../shared';

@Component({
  selector: 'app-tags-details',
  standalone: true,
  imports: [
    CommonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    LoadingComponent,
  ],
  templateUrl: './tags-details.component.html',
  styleUrl: './tags-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsDetailsComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() tag!: Tag;

  public isPopupVisible: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tagsService: TagsServiceService,
    private remindService: RequestRemindService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params) => this.tagsService.get(params['id'])),
      )
      .subscribe((res: Tag) => {
        this.tag = res;
        this.isPopupVisible = true;
        this.cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public closePopup(): void {
    this.isPopupVisible = false;
    this.close.emit();
    this.router.navigate(['reminders']);
  }

  public save(): void {
    this.tagsService.update(this.tag).subscribe(() => {
      this.remindService.updateTagInReminds(this.tag);
      this.router.navigate(['tags']);
      this.closePopup();
    });
  }
}
