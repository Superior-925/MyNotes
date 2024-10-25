import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Note } from '../../models';
import { RequestService } from '../../service/notes-service.service';
import { BaseDataComponent } from '../based/based-data.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { CardComponent, LoadingComponent, SectionWrapperComponent } from '../../shared';
import { DevExtremeModule } from 'devextreme-angular';
import { NoteAddComponent } from './note-add/note-add.component';
import { LoadingService } from '../../service/loader.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NotesDetailsComponent,
    NoteAddComponent,
    DevExtremeModule,
    SectionWrapperComponent,
    LoadingComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent extends BaseDataComponent<Note> {
  constructor(
    protected notesService: RequestService,
    protected override router: Router,
    protected override loadingService: LoadingService,
  ) {
    super(notesService, router, loadingService);
  }

  public addNote = () => {
    this.addItem('add');
  };

  public noteDetails = (note: Note): void => {
    const noteId = note.id;
    this.router.navigate(['notes', noteId]);
  };

  public deleteNote = (id: number) => {
    this.deleteItem(id);
  };
}
