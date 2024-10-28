import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, tap } from 'rxjs';

import { Tag } from '../models';
import { DataService } from './data-service.service';

/**
 * Сервис для работы с тегами.
 */
@Injectable({
  providedIn: 'root',
})
export class TagsServiceService extends DataService<Tag> {
  private tagsCache$: ReplaySubject<Tag[]> = new ReplaySubject(1);

  constructor(http: HttpClient) {
    super(http, 'api/tags');
    this.loadTags(); // Загрузка тегов при инициализации
  }

  private loadTags(): void {
    this.getAll()
      .pipe(tap((tags) => this.tagsCache$.next(tags)))
      .subscribe();
  }
}
