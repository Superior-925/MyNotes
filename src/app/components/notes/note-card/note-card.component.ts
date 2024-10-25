import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CardItemComponent } from '../../../shared';
import { Note } from '../../../models';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CardItemComponent, DatePipe],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<Note>();
  @Output() editNote = new EventEmitter<Note>();

  public onDelete(): void {
    this.deleteNote.emit(this.note);
  }

  public onEdit(): void {
    this.editNote.emit();
  }
}
