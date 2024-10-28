import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TagsServiceService } from '../../service/tags-service.service';
import { LoadingComponent, SectionWrapperComponent } from '../../shared';
import { TagsCardComponent } from './tags-card/tags-card.component';
import { Tag } from '../../models';
import { BaseDataComponent } from '../based/based-data.component';
import { LoadingService } from '../../service/loader.service';
import { RequestRemindService } from '../../service/reminds-service.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [SectionWrapperComponent, TagsCardComponent, CommonModule, LoadingComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent extends BaseDataComponent<Tag> implements OnInit {
  constructor(
    protected tagService: TagsServiceService,
    protected override router: Router,
    protected remindService: RequestRemindService,
    protected override loadingService: LoadingService,
  ) {
    super(tagService, router, loadingService);
  }

  public addTag = (): void => {
    this.addItem('tags/add');
  };

  public tagDetails = (tag: Tag): void => {
    const tagId = tag.id;
    this.router.navigate(['tags', tagId]);
  };

  public deleteTag = (tag: Tag): void => {
    this.remindService.deleteTagFromReminds(tag.id);
    this.deleteItem(tag.id);
  };
}
