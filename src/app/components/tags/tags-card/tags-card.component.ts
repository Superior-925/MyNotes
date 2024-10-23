import {Component, Input} from '@angular/core';
import {Tag} from "../../../models";
import {CardItemComponent} from "../../../shared";

@Component({
  selector: 'app-tags-card',
  standalone: true,
  imports: [
    CardItemComponent
  ],
  templateUrl: './tags-card.component.html',
  styleUrl: './tags-card.component.css'
})
export class TagsCardComponent {
  @Input() tag!: Tag; // Добавляем список всех тегов
  @Input() deleteParentFunc!: (tag: Tag) => void;
  @Input() editParentFunc!: (tag: Tag) => void;

  ngOnInit (): void {
    console.log(this.tag)
    console.log(this.tag)
  }
  onDelete =(): void => {
    this.deleteParentFunc(this.tag)
  }
  onEdit =(): void=> {
    this.editParentFunc(this.tag)
  }
}
