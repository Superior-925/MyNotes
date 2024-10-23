import {Component} from '@angular/core';
import {Tag} from "../../models";
import {TagsServiceService} from "../../service/tags-service.service";
import {Router} from "@angular/router";
import {SectionWrapperComponent} from "../../shared";
import {TagsCardComponent} from "./tags-card/tags-card.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    SectionWrapperComponent,
    TagsCardComponent,
    CommonModule
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags: Tag[] = []
  loading: boolean = false

  constructor(private reqService: TagsServiceService, private router: Router) {
    this.getTags()
  }

  getTags() {
    this.loading = true;
    this.reqService.getTags().subscribe(
      (res: Tag[]) => {
        this.tags = res;
        console.log(this.tags)
        this.loading = false
      }, (err) => {
        console.error(err)
        this.loading = false
      })
  }

  addTag = (): void => {
    this.router.navigate(['tags/add'])
  }
  tagDetails = (tag: Tag) => {
    const tagId = tag.id;
    this.router.navigate(['tags', tagId]);
  }

  deleteTag = (tag: any): void => {
    this.tags = this.tags.filter(u => u !== tag)
    this.reqService.deleteTag(tag).subscribe()
  }

}
