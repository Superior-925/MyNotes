import {Component} from '@angular/core';
import {Note} from "../../models/note";
import {RequestService} from "../../service/notes-service.service";
import {Router} from "@angular/router";
import {CardComponent} from "../../shared/card/card.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',

})
export class NotesComponent {
  notes: Note[] = []
  loading: boolean = false

  constructor(private reqService: RequestService, private router: Router) {
    this.getNotes()
  }

  getNotes() {
    this.loading=true;
    this.reqService.getNotes().subscribe(
    (res:Note[]) => {
      this.notes = res
      this.loading=false;
    },(err)=> {
      console.error(err)
      this.loading = false
    })
  }
  addNote():void {
    this.router.navigate(['add'])
  }
  noteDetails(note:Note){
    const noteId= note.id
    this.router.navigate(['note',noteId])
  }
  deleteNote (note:any) {
    this.notes = this.notes.filter(u => u !== note)
    this.reqService.deleteNote(note).subscribe()
  }
}
