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

  constructor(private reqService: RequestService) {
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
  addNote():void {}
  noteDetails(id:number){}
  deleteNote (note:any) {
    this.notes = this.notes.filter(u => u !== note)
    this.reqService.deleteNote(note).subscribe()
  }
}
