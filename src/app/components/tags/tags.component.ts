import {Component, OnInit} from '@angular/core';
import {Tag} from "../../models";
import {TagsServiceService} from "../../service/tags-service.service";
import {Router} from "@angular/router";
import {LoadingComponent, SectionWrapperComponent} from "../../shared";
import {TagsCardComponent} from "./tags-card/tags-card.component";
import {CommonModule} from "@angular/common";
import {BaseDataComponent} from "../based/based-data.component";
import {LoadingService} from "../../service/loader.service";
import {RequestRemindService} from "../../service/reminds-service.service";

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    SectionWrapperComponent,
    TagsCardComponent,
    CommonModule,
    LoadingComponent
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent extends BaseDataComponent<Tag> implements OnInit{
  constructor(
    protected tagService: TagsServiceService,
    protected override router: Router,
    protected remindService: RequestRemindService,
    protected override loadingService: LoadingService) {
    super(tagService, router,loadingService);

  }

  addTag = () => {
    this.addItem('tags/add')
  }

  tagDetails = (tag: Tag) => {
    const tagId = tag.id;
    this.router.navigate(['tags', tagId]);
  }

  deleteTag = (tag: Tag): void => {
    this.remindService.deleteTagFromReminds(tag.id)
    this.deleteItem(tag.id)

  }
}





/*
  constructor(
    protected tagService: TagsServiceService,
    protected override router: Router,
    protected override loadingService: LoadingService
  ) {
    super(tagService, router,loadingService);
  }

  override ngOnInit() : void {
    this.tagService.loadTags()
  }

  loadCachedTags(): void {
    this.tagService.getCachedTags().subscribe(tags => {
      this.items = tags; // Используем items из BaseDataComponent для хранения тегов
    });
  }

  addTag = ():void => {
    this.addItem('tags/add')
    this.tagService.addTagToCache()
  }

  tagDetails = (tag: Tag) => {
    const tagId = tag.id;
    this.router.navigate(['tags', tagId]);
  }

  deleteTag = (tag: Tag): void => {
    this.deleteItem(tag.id)
  }
*/
