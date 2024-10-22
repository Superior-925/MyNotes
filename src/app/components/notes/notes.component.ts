import {Component} from '@angular/core';
import {Note} from "../../models/note";
import {RequestService} from "../../service/notes-service.service";
import {Router} from "@angular/router";
import {CardComponent} from "../../shared/card/card.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NotesDetailsComponent} from "./notes-details/notes-details.component";
import {NoteAddComponent} from "./note-add/note-add.component";
import {DevExtremeModule} from "devextreme-angular";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NotesDetailsComponent,
    NoteAddComponent,
    DevExtremeModule
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',

})
export class NotesComponent {
  notes: Note[] = []
  loading: boolean = false
  colCountByScreen = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 3
  };

  rows = [
    { ratio: 1 },
    { ratio: 1 },
    { ratio: 1 }
  ];


constructor(private reqService: RequestService, private router: Router) {
    this.getNotes()
  }

  getNotes() {
    this.loading = true;
    this.reqService.getNotes().subscribe(
      (res: Note[]) => {
        this.notes = res
        this.loading = false;
      }, (err) => {
        console.error(err)
        this.loading = false
      })
  }

  addNote(): void {
    this.router.navigate(['add'])
  }

  noteDetails(note: Note) {
    const noteId = note.id
    this.router.navigate(['notes', noteId])
  }

  deleteNote(note: any) {
    this.notes = this.notes.filter(u => u !== note)
    this.reqService.deleteNote(note).subscribe()
  }
}
