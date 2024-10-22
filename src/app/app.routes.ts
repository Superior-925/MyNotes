import {RouterModule, Routes} from '@angular/router';
import {NotesComponent} from "./components/notes/notes.component";
import {RemindersComponent} from "./components/reminders/reminders.component";
import {TagsComponent} from "./components/tags/tags.component";
import {NgModule} from "@angular/core";

export const ROUTES: Routes = [
  {path: '', redirectTo: '/notes', pathMatch: 'full'},
  {path: 'notes', component: NotesComponent},
  {path: 'reminders', component: RemindersComponent, title: 'Reminders'},
  {path: 'tags', component: TagsComponent, title: 'Tags'},
  {path: '**', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
