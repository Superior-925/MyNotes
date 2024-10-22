import {Injectable} from '@angular/core';
import {Note} from "../models/note";
/**
 * Сервис `NotesServiceService` предназначен для управления заметками в приложении.
 * Он предоставляет методы для добавления, удаления, редактирования и получения списка записок.
 *
 * @example
 * // Добавление новой заметки
 * this.notesService.addNote(new Note('Заметка 1'));
 *
 * // Удаление заметки по ID
 * this.notesService.deleteNote(1);
 *
 * // Редактирование существующей заметки
 * const updatedNote = new Note('Обновленная заметка', 1);
 * this.notesService.editNote(updatedNote);
 *
 * // Получение списка всех записок
 * const notes = this.notesService.getNotes();
 */
@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {
  private notes: Array<Note> = [];

  constructor() {
  }

  addNote(note: Note) {
    this.notes.push(note)
  }

  deleteNote(id: number) {
    this.notes = this.notes.filter(note => note.id !== id)
  }

  editNote(updateNote: Note) {
    const index = this.notes.findIndex(note => note.id === updateNote.id)
    if (index != -1) {
      this.notes[index] = updateNote
    }
  }

  getNotes(): Note[] {
    return this.notes;
  }
}
