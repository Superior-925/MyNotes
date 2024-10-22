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
  @Input() remind!: Remind;
  @Output() deleteRemind = new EventEmitter<Remind>();
  @Output() editRemind = new EventEmitter<Remind>();

  ngOnInit():void {
    console.log(this.remind)
  }
  onDelete() : void {
    this.deleteRemind.emit(this.remind)
  }

  onEdit() : void {
    this.editRemind.emit()
  }
}
