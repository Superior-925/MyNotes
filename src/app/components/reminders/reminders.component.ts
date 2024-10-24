import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NotesDetailsComponent} from "../notes/notes-details/notes-details.component";
import {NoteAddComponent} from "../notes/note-add/note-add.component";
import {DevExtremeModule} from "devextreme-angular";
import {Remind} from "../../models/remind";
import {RequestRemindService} from "../../service/reminds-service.service";
import {Router} from "@angular/router";
import {SectionWrapperComponent} from "../../shared/section-wrapper/section-wrapper.component";
import {RemindCardComponent} from "./remind-card/remind-card.component";
import {TagsServiceService} from "../../service/tags-service.service";
import {Tag} from "../../models";
import {BaseDataComponent} from "../based/based-data.component";
import {LoadingService} from "../../service/loader.service";
import {LoadingComponent} from "../../shared";

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
  styleUrl: './reminders.component.css'
})
export class RemindersComponent  extends BaseDataComponent<Remind> implements OnInit{

  tags: Tag[] = []
  currentRemind: Remind | null = null; // Для отображения в Popup


  constructor(
    protected override dataService: RequestRemindService,
    protected tagService: TagsServiceService,
    protected override router: Router,
    protected override loadingService: LoadingService,
    private remindServ: RequestRemindService
  ) {
    super(dataService, router,loadingService);
    this.tagService.getAll().subscribe((tags:Tag[]) => {
      this.tags = tags
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setupReminders();
  }

  addRemind=():void => {
    this.addItem('reminders/add')
  }

  remindDetails = (remind: Remind) => {
    const remindId = remind.id;
    this.router.navigate(['reminders', remindId]);
  }

  deleteRemind = (id:number) => {
    this.deleteItem(id)
  }

  setupReminders(): void {
    this.items.forEach(remind => {
      this.remindServ.setReminder(remind);
    });

    this.remindServ.remind$.subscribe(remind => {
      if (remind) {
        this.currentRemind = remind;
      }
    });
  }

}

