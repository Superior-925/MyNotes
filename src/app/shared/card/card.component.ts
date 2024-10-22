import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../models/note";
import {CommonModule} from "@angular/common";
import {DxButtonModule} from "devextreme-angular";

@Component({
  selector: 'app-card',
  standalone: true,
    imports: [CommonModule, DxButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
@Input() note!: Note;
@Output() deleteNote = new EventEmitter<Note>();
@Output() editNote = new EventEmitter<Note>();
//@Output() addNote = new EventEmitter<void>();


ngOnInit():void {
  console.log(this.note)
}
onDelete() : void {
  this.deleteNote.emit(this.note)
}
onEdit() : void {
  this.editNote.emit(this.note)
}
}
