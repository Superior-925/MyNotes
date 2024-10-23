import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {CardItemComponent} from "../../../shared/card-item/card-item.component";
import {Note} from "../../../models/note";
import {Remind} from "../../../models/remind";

@Component({
  selector: 'app-remind-card',
  standalone: true,
  imports: [
    DatePipe,
    CardItemComponent,
    CommonModule
  ],
  templateUrl: './remind-card.component.html',
  styleUrl: './remind-card.component.css'
})
export class RemindCardComponent {
  //получаем от родителя массив
  @Input() remind!: Remind;
  @Input() deleteParentFunc!: (remind: Remind) => void;
  @Input() editParentFunc!: (remind: Remind) => void;


  ngOnInit (): void {
    console.log(this.remind)
  }
  onDelete =(): void => {
    this.deleteParentFunc(this.remind)
  }
  onEdit =(): void=> {
    this.editParentFunc(this.remind)
  }
}