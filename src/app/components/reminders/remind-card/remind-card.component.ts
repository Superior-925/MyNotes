import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {CardItemComponent} from "../../../shared/card-item/card-item.component";
import {Note} from "../../../models/note";
import {Remind} from "../../../models/remind";
import {Tag} from "../../../models";
import {TagsServiceService} from "../../../service/tags-service.service";

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
  @Input() deleteParentFunc!: (id: number) => void;
  @Input() editParentFunc!: (remind: Remind) => void;
  tags: Tag[] = [];
  constructor(private tagsService: TagsServiceService) {}

  ngOnInit (): void {
    this.tagsService.getAll().subscribe(tags => {
      this.tags = tags;
      this.remind.tags = this.remind.tags.map(remindTag => tags.find(tag => tag.id === remindTag.id)!);
    })
  }
  onDelete =(): void => {
    this.deleteParentFunc(this.remind.id)
  }
  onEdit =(): void=> {
    this.editParentFunc(this.remind)
  }
}

//получаем от родителя массив
/*
@Input() remind!: Remind;
@Input() tags!: Tag[]; // Добавляем список всех тегов
@Input() deleteParentFunc!: (id: number) => void;
@Input() editParentFunc!: (remind: Remind) => void;


ngOnInit (): void {
}
onDelete =(): void => {
  this.deleteParentFunc(this.remind.id)
}
onEdit =(): void=> {
  this.editParentFunc(this.remind)*/
