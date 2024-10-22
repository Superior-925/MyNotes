import { Component } from '@angular/core';
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
import {Note} from "../../../models/note";
import {Remind} from "../../../models/remind";

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
  remindForm:FormGroup
  isPopupVisible = true;
  constructor(
    private formBuilder:FormBuilder,
    private reqService:RequestRemindService,
    private router:Router
  ) {
    this.remindForm = this.formBuilder.group({
      title: ['',Validators.required],
      tags: [''], // Опционально, можешь добавить валидаторы
      deadline:[null, Validators.required],
      remindMe:[null, Validators.required]

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

    const remind: Remind = {
      id: 0,
      title: this.f.title.value,
      tags: this.f.tags.value ? this.f.tags.value.split(',') : [],
      deadline: this.f.deadline.value,
      remindMe: this.f.remindMe.value,
    };


    this.reqService
      .addRemind(remind as Remind)
      .subscribe(() => this.router.navigate(['reminders']))
    this.isPopupVisible = false

  }

}
