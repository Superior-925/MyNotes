import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DevExtremeModule } from 'devextreme-angular';

import { NotesDetailsComponent } from '../notes/notes-details/notes-details.component';
import { NoteAddComponent } from '../notes/note-add/note-add.component';
import { Remind, Tag } from '../../models';
import { RequestRemindService } from '../../service/reminds-service.service';
import { LoadingComponent, SectionWrapperComponent } from '../../shared';
import { RemindCardComponent } from './remind-card/remind-card.component';
import { TagsServiceService } from '../../service/tags-service.service';
import { BaseDataComponent } from '../based/based-data.component';
import { LoadingService } from '../../service/loader.service';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [
    CommonModule,
    NotesDetailsComponent,
    NoteAddComponent,
    DevExtremeModule,
    SectionWrapperComponent,
    RemindCardComponent,
    LoadingComponent,
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.scss',
})
export class RemindersComponent extends BaseDataComponent<Remind> implements OnInit {
  public tags: Tag[] = [];
  public currentRemind: Remind | null = null; // Для отображения в Popup

  constructor(
    protected override dataService: RequestRemindService,
    protected tagService: TagsServiceService,
    protected override router: Router,
    protected override loadingService: LoadingService,
    private remindServ: RequestRemindService,
  ) {
    super(dataService, router, loadingService);
    this.tagService.getAll().subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.setupReminders();
  }

  public addRemind = (): void => {
    this.addItem('reminders/add');
  };

  public remindDetails = (remind: Remind): void => {
    const remindId = remind.id;
    this.router.navigate(['reminders', remindId]);
  };

  public deleteRemind = (id: number): void => {
    this.deleteItem(id);
  };

  private setupReminders(): void {
    this.items.forEach((remind) => {
      this.remindServ.setReminder(remind);
    });

    this.remindServ.remind$.subscribe((remind) => {
      if (remind) {
        this.currentRemind = remind;
      }
    });
  }
}
