import {RouterModule, Routes} from '@angular/router';
import {NotesComponent} from "./components/notes/notes.component";
import {RemindersComponent} from "./components/reminders/reminders.component";
import {TagsComponent} from "./components/tags/tags.component";
import {NgModule} from "@angular/core";
import {NotesDetailsComponent} from "./components/notes/notes-details/notes-details.component";
import {NoteAddComponent} from "./components/notes/note-add/note-add.component";

export const ROUTES: Routes = [
  {path: '', component: NotesComponent},
  {path: 'notes', component: NotesComponent, title: 'Notes'},
  {path: 'notes/:id', component: NotesDetailsComponent},
  {path: 'add', component: NoteAddComponent},
  {path: 'reminders', component: RemindersComponent, title: 'Reminders'},
  {path: 'tags', component: TagsComponent, title: 'Tags'},
  {path: '**', component: NotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
