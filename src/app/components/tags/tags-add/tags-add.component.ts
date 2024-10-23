import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TagsServiceService} from "../../../service/tags-service.service";
import {Remind, Tag} from "../../../models";
import {catchError, throwError} from "rxjs";
import {
  DxButtonModule,
  DxDateBoxModule, DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from "devextreme-angular";
import {CommonModule} from "@angular/common";

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
  styleUrl: './tags-add.component.css'
})
export class TagsAddComponent {

  remindForm: FormGroup
  isPopupVisible = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private  tagService: TagsServiceService
  ) {
    this.remindForm = this.formBuilder.group({
      tagTitle: ['', Validators.required],
    })

  }

  get f(): any {
    return this.remindForm.controls;
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.remindForm.invalid) {
      return
    }


    const tag: Tag = {
      id: 0,
      tagTitle: this.f.title.value,
    };

    this.tagService.addTag(tag as Tag)
      .pipe(
        catchError(error => {
          console.error('Ошибка при добавлении напоминания:', error);
          return throwError(error);
        })
      )
      .subscribe(() => this.router.navigate(['tags']));

  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['tags'])
  }

}
