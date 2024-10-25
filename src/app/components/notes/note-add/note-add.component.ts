import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { RequestService } from '../../../service/notes-service.service';
import { Note } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-add',
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
  templateUrl: './note-add.component.html',
  styleUrl: './note-add.component.scss',
})
export class NoteAddComponent {
  constructor(
    private formBuilder: FormBuilder,
    private reqService: RequestService,
    private router: Router,
  ) {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  public noteForm: FormGroup;
  public isPopupVisible = true;

  public save(): void {
    if (this.noteForm.invalid) {
      return;
    }

    const note: Note = {
      id: 0,
      title: this.formControls.title.value,
      content: this.formControls.content.value,
    };

    this.reqService.add(note as Note).subscribe(() => this.router.navigate(['notes']));
    this.isPopupVisible = false;
  }

  public closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['notes']);
  }

  private get formControls(): any {
    return this.noteForm.controls;
  }
}
