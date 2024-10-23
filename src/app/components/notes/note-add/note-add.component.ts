import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RequestService} from "../../../service/notes-service.service";
import {Router} from "@angular/router";
import {
  DxButtonModule,
  DxDateBoxModule, DxFormModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from "devextreme-angular";
import {Note} from "../../../models/note";
import {CommonModule} from "@angular/common";

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
  styleUrl: './note-add.component.css'
})
export class NoteAddComponent implements OnInit {
  noteForm: FormGroup
  isPopupVisible = true;

  constructor(
    private formBuilder: FormBuilder,
    private reqService: RequestService,
    private router: Router
  ) {

    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

  get f(): any {
    return this.noteForm.controls;
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.noteForm.invalid) {
      return
    }

    const note: Note = {
      id: 0,
      title: this.f.title.value,
      content: this.f.content.value,
    };


    this.reqService
      .addNote(note as Note)
      .subscribe(() => this.router.navigate(['notes']))
    this.isPopupVisible = false

  }
  closePopup(): void {
    this.isPopupVisible = false;
    this.router.navigate(['notes'])
  }
}
