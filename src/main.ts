import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NotesComponent} from "./app/components/notes/notes.component";
import {RemindersComponent} from "./app/components/reminders/reminders.component";
import {TagsComponent} from "./app/components/tags/tags.component";



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot([
      { path: '', component: NotesComponent, title: 'Notes' },
      { path: 'notes', component: NotesComponent },
      { path: 'reminders', component: RemindersComponent, title: 'Reminders' },
      { path: 'tags', component: TagsComponent, title: 'Tags' },
    ]))
  ]
});

