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
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

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
  showNotification: boolean = false;
  currentRemind: Remind | null = null

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

    this.tagService.getAll().subscribe((tags:Tag[]) => {
      this.tags = tags
    })
  }

  get f(): any {
    return this.remindForm.controls;
  }

  ngOnInit(): void {
    this.reqService.remind$.subscribe(remind => {
      this.currentRemind = remind;
      this.showNotification = remind !== null;
    });
    }



  save(): void {
    if (this.remindForm.invalid) {
      return
    }

    const tagIds = this.f.tags.value;
    const tagObjects = tagIds.map((id:number) => this.tags.find(tag => tag.id === id));

    const remind: Remind = {
      id: 0,
      title: this.f.title.value,
      tags: tagObjects,
      deadline: this.f.deadline.value,
      remindMe: this.f.remindMe.value,
    };

    this.reqService.add(remind as Remind).subscribe(savedRemind => {
      this.reqService.setReminder(savedRemind);
      console.log(this.currentRemind)
      this.router.navigate(['reminders']);
    })

  }

  cancelReminder(): void {
    this.reqService.clearReminder();
  }

  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['reminders'])
  }

}
/*  setupRemindNotification(remind: Remind): void {
    const remindDate = new Date(remind.remindMe).getTime();
    const now = new Date().getTime();
    const timeUntilRemind = remindDate - now;

    if (timeUntilRemind > 0) {
      setTimeout(() => {
        // Тут код для показа уведомления. Например, вы можете использовать dx-popup для отображения уведомления.
        // Вы можете определить дополнительное свойство в компоненте для контроля видимости уведомления.
        this.showNotification = true; // Убедитесь, что у вас есть свойство showNotification в компоненте.
        // Также установите текущее напоминание для отображения информации в уведомлении.
        this.currentRemind = remind;
      }, timeUntilRemind);
    }
  }*/
