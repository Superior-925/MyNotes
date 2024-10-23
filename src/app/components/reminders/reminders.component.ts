import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NotesDetailsComponent} from "../notes/notes-details/notes-details.component";
import {NoteAddComponent} from "../notes/note-add/note-add.component";
import {DevExtremeModule} from "devextreme-angular";
import {Remind} from "../../models/remind";
import {RequestRemindService} from "../../service/reminds-service.service";
import {Router} from "@angular/router";
import {SectionWrapperComponent} from "../../shared/section-wrapper/section-wrapper.component";
import {RemindCardComponent} from "./remind-card/remind-card.component";

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
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  reminds: Remind[] = []
  loading: boolean = false

  constructor(
    private reqService: RequestRemindService,
    private router: Router
  ) {
    this.getReminds()
  }

  getReminds() {
    this.loading = true
    this.reqService
      .getReminds().subscribe(
      (res:Remind[]) => {
        this.reminds = res
        this.loading = false
        /*console.log(res)*/
      }, (err) => {
        console.log(err)
        this.loading = false
      }
    )
  }

  addRemind=():void => {
    this.router.navigate(['reminders/add'])
  }

  remindDetails = (remind: Remind) => {
    const remindId = remind.id;
    this.router.navigate(['reminders', remindId]);
  }

  deleteRemind = (remind:Remind) => {
    this.reminds = this.reminds.filter(u =>u.id !== remind.id)
    this.reqService.deleteRemind(remind).subscribe()
  }
}
