import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesDetailsComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Input() note!: Note;

  public isPopupVisible = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((params) => this.reqService.get(params['id'])),
      )
      .subscribe((res: Note) => {
        this.note = res;
        this.isPopupVisible = true; // Показываем модальное окно после загрузки заметки
        this.cdr.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public save(): void {
    this.reqService.update(this.note).subscribe(() => this.router.navigate(['notes']));
  }
}
