import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NotesComponent} from "./app/components/notes/notes.component";
import {RemindersComponent} from "./app/components/reminders/reminders.component";
import {TagsComponent} from "./app/components/tags/tags.component";
import {InMemoryDataService} from "./app/service/in-memory-data.service";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {HttpClientModule} from "@angular/common/http";
import {NotesDetailsComponent} from "./app/components/notes/notes-details/notes-details.component";
import {NoteAddComponent} from "./app/components/notes/note-add/note-add.component";



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)),
    importProvidersFrom(RouterModule.forRoot([
      { path: '', component: NotesComponent, title: 'Notes' },
      { path: 'notes', component: NotesComponent },
      { path: 'notes/:id', component: NotesDetailsComponent },
      { path: 'add', component: NoteAddComponent },
      { path: 'reminders', component: RemindersComponent, title: 'Reminders' },
      { path: 'tags', component: TagsComponent, title: 'Tags' },
      { path: '**', component: NotesComponent },
    ])),
  ]
});

