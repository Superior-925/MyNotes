import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
})
export class TagsDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() tag!: Tag;

  public isPopupVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tagsService: TagsServiceService,
    private remindService: RequestRemindService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.tagsService.get(params['id']).subscribe((res: Tag) => {
        this.tag = res;
        this.isPopupVisible = true;
        this.cdr.markForCheck();
      });
    });
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
