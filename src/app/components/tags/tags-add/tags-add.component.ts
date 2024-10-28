import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { TagsServiceService } from '../../../service/tags-service.service';
import { Tag } from '../../../models';

/**
 * Компонент добавления тегов.
 */
@Component({
  selector: 'app-tags-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    DxFormModule,
  ],
  templateUrl: './tags-add.component.html',
  styleUrl: './tags-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsAddComponent {
  remindForm: FormGroup;
  isPopupVisible = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tagService: TagsServiceService,
  ) {
    this.remindForm = this.formBuilder.group({
      tagTitle: ['', Validators.required],
    });
  }

  public save(): void {
    if (this.remindForm.invalid) {
      return;
    }

    const tag: Tag = {
      id: 0,
      tagTitle: this.formControls.tagTitle.value,
    };

    this.tagService
      .add(tag as Tag)
      .pipe(
        catchError((error) => {
          console.error('Ошибка при добавлении напоминания:', error);
          return throwError(error);
        }),
      )
      .subscribe(() => this.router.navigate(['tags']));
  }

  public closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['tags']);
  }

  private get formControls(): any {
    return this.remindForm.controls;
  }
}
