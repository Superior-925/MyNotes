import {Component} from '@angular/core';
import {Note} from "../../../models/note";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../../service/notes-service.service";

@Component({
  selector: 'app-notes-details',
  standalone: true,
  imports: [],
  templateUrl: './notes-details.component.html',
  styleUrl: './notes-details.component.css'
})
export class NotesDetailsComponent {
  note: Note = {
    id: 0,
    title: '',
    content: '',
    tags: [],
    date: '',
    deadline: '',
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private reqService: RequestService,
    private router: Router,
  )
  {
    this.activatedRouter.params.subscribe((params) => {
      reqService
        .getNote(params['id'])
        .subscribe((res: Note) => (this.note = res))
    })
  }
  save(): void {
    this.reqService
      .updateNote(this.note)
      .subscribe(() => this.router.navigate(['notes']))
  }

}
