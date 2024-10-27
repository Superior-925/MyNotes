import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { RequestRemindService } from '../../../service/reminds-service.service';
import { Remind, Tag } from '../../../models';
import { TagsServiceService } from '../../../service/tags-service.service';

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
  styleUrl: './remind-add.component.scss',
})
export class RemindAddComponent implements OnInit {
  public remindForm: FormGroup;
  public isPopupVisible = true;
  public tags: Tag[] = [];
  public showNotification: boolean = false;
  public currentRemind: Remind | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private reqService: RequestRemindService,
    private router: Router,
    private tagService: TagsServiceService,
  ) {
    this.remindForm = this.formBuilder.group({
      title: ['', Validators.required],
      tags: [''],
      deadline: [null, Validators.required],
      remindMe: [null, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.reqService.remind$.subscribe((remind) => {
      this.currentRemind = remind;
      this.showNotification = remind !== null;
    });

    this.tagService.getAll().subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  public save(): void {
    if (this.remindForm.invalid) {
      return;
    }

    const tagIds = this.formControls.tags.value;
    const tagObjects = tagIds.map((id: number) => this.tags.find((tag) => tag.id === id));

    const remind: Remind = {
      id: 0,
      title: this.formControls.title.value,
      tags: tagObjects,
      deadline: this.formControls.deadline.value,
      remindMe: this.formControls.remindMe.value,
    };

    this.reqService.add(remind).subscribe((savedRemind) => {
      this.reqService.setReminder(savedRemind);
      this.router.navigate(['reminders']);
    });
  }

  public closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['reminders']);
  }

  private get formControls(): any {
    return this.remindForm.controls;
  }
}
