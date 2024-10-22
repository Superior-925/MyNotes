import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CardComponent} from "../../shared/card/card.component";
import {NotesDetailsComponent} from "../notes/notes-details/notes-details.component";
import {NoteAddComponent} from "../notes/note-add/note-add.component";
import {DevExtremeModule} from "devextreme-angular";
import {Remind} from "../../models/remind";
import {RequestRemindService} from "../../service/reminds-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports: [
    CommonModule,
    NotesDetailsComponent,
    NoteAddComponent,
    DevExtremeModule,
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
        console.log(res)
      }, (err) => {
        console.log(err)
        this.loading = false
      }
    )
  }
}
