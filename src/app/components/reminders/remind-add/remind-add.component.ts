import {Component} from '@angular/core';
import {
  DxButtonModule,
  DxDateBoxModule, DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from "devextreme-angular";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequestRemindService} from "../../../service/reminds-service.service";
import {Router} from "@angular/router";
import {Remind} from "../../../models/remind";
import {catchError, throwError} from "rxjs";
import {TagsServiceService} from "../../../service/tags-service.service";
import {Tag} from "../../../models";

@Component({
  selector: 'app-remind-add',
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
  templateUrl: './remind-add.component.html',
  styleUrl: './remind-add.component.css'
})
export class RemindAddComponent {
  remindForm: FormGroup
  isPopupVisible = true;
  tags:Tag[] = []

  constructor(
    private formBuilder: FormBuilder,
    private reqService: RequestRemindService,
    private router: Router,
    private  tagService: TagsServiceService
  ) {
    this.remindForm = this.formBuilder.group({
      title: ['', Validators.required],
      tags: [''],
      deadline: [null, Validators.required],
      remindMe: [null, Validators.required]
    })

    this.tagService.getTags().subscribe((tags) => {
      this.tags = tags
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

    // Преобразование идентификаторов тегов в объекты тегов
    const tagIds = this.f.tags.value;
    const tagObjects = tagIds.map((id:number) => this.tags.find(tag => tag.id === id));

    const remind: Remind = {
      id: 0,
      title: this.f.title.value,
      tags: tagObjects,
      deadline: this.f.deadline.value,
      remindMe: this.f.remindMe.value,
    };

    this.reqService.addRemind(remind as Remind)
      .pipe(
        catchError(error => {
          console.error('Ошибка при добавлении напоминания:', error);
          return throwError(error);
        })
      )
      .subscribe(() => this.router.navigate(['reminders']));


  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['reminders'])
  }

}
