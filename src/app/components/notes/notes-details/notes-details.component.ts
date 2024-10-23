import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../../models/note";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../../../service/notes-service.service";
import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from "devextreme-angular";

@Component({
  selector: 'app-notes-details',
  standalone: true,
  imports: [
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxButtonModule
  ],
  templateUrl: './notes-details.component.html',
  styleUrl: './notes-details.component.css'
})
export class NotesDetailsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() note!: Note;

  isPopupVisible = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestService,
    private router: Router,
  ){}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.reqService.getNote(params['id']).subscribe((res: Note) => {
        this.note = res;
        this.isPopupVisible = true; // Показываем модальное окно после загрузки заметки
      });
    });
  }
  closePopup(): void {
    this.isPopupVisible = false;
    this.close.emit();
  }
  save(): void {
    this.reqService
      .updateNote(this.note)
      .subscribe(() => this.router.navigate(['notes']))
  }

}
