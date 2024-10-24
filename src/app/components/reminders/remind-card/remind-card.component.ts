import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {CardItemComponent} from "../../../shared/card-item/card-item.component";
import {Note} from "../../../models/note";
import {Remind} from "../../../models/remind";
import {Tag} from "../../../models";
import {TagsServiceService} from "../../../service/tags-service.service";
import {RequestRemindService} from "../../../service/reminds-service.service";

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
  @Input() deleteParentFunc!: (id: number) => void;
  @Input() editParentFunc!: (remind: Remind) => void;
  tags: Tag[] = [];

  constructor(
    private tagsService: TagsServiceService) {}

  ngOnInit(): void {
    this.tagsService.getAll().subscribe((tags:Tag[]) => {
      this.tags = tags;

      if (this.remind && this.remind.tags) {
        // Промежуточный шаг: преобразуем теги в remind в соответствующие теги из загруженного списка или в undefined
        const updatedTags: (Tag | undefined)[] = this.remind.tags.map(remindTag =>
          tags.find(tag => tag.id === remindTag.id)
        );

        // Финальный шаг: фильтруем undefined значения и приводим результат к типу Tag[]
        this.remind.tags = updatedTags.filter((tag): tag is Tag => tag !== undefined);
      }
    });
  }


  onDelete =(): void => {
    this.deleteParentFunc(this.remind.id)
  }
  onEdit =(): void=> {
    this.editParentFunc(this.remind)
  }
}


/*
ngOnInit (): void {
  this.tagsService.getAll().subscribe(tags => {
    this.tags = tags;
    this.remind.tags = this.remind.tags.map(remindTag => tags.find(tag => tag.id === remindTag.id)!);
  })
}*/
