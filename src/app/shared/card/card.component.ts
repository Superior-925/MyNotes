import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Note } from '../../models';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DxButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
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
