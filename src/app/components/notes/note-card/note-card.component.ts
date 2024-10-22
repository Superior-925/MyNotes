import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardItemComponent} from "../../../shared/card-item/card-item.component";
import {Note} from "../../../models/note";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    CardItemComponent,
    DatePipe
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<Note>();
  @Output() editNote = new EventEmitter<Note>();

  ngOnInit():void {
    console.log(this.note)
  }
  onDelete() : void {
    this.deleteNote.emit(this.note)
  }

  onEdit() : void {
    this.editNote.emit()
  }
}
