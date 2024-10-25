import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DxButtonModule, DxDateBoxModule, DxPopupModule, DxTagBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { ActivatedRoute, Router } from '@angular/router';

import { Note } from '../../../models';
import { RequestService } from '../../../service/notes-service.service';

@Component({
  selector: 'app-notes-details',
  standalone: true,
  imports: [DxPopupModule, DxTextBoxModule, DxTextAreaModule, DxTagBoxModule, DxDateBoxModule, DxButtonModule],
  templateUrl: './notes-details.component.html',
  styleUrl: './notes-details.component.scss',
})
export class NotesDetailsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() note!: Note;

  isPopupVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.reqService.get(params['id']).subscribe((res: Note) => {
        this.note = res;
        this.isPopupVisible = true; // Показываем модальное окно после загрузки заметки
      });
    });
  }

  public save(): void {
    this.reqService.update(this.note).subscribe(() => this.router.navigate(['notes']));
  }
}
