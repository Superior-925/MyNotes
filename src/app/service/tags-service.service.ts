import { Injectable } from '@angular/core';
import { Tag } from "../models";
import { DataService } from "./data-service.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, ReplaySubject, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService extends DataService<Tag> {
  private tagsCache$: ReplaySubject<Tag[]> = new ReplaySubject(1);

  constructor(http: HttpClient) {
    super(http, 'api/tags');
    this.loadTags(); // Загрузка тегов при инициализации
  }

  private loadTags(): void {
    this.getAll()
      .pipe(tap(tags => this.tagsCache$.next(tags)))
      .subscribe();
  }

  getCachedTags(): Observable<Tag[]> {
    return this.tagsCache$.asObservable();
  }

  updateTagInCache(updatedTag: Tag): void {
    this.tagsCache$
      .pipe(
        switchMap(tags => {
          const updatedTags = tags.map(tag => tag.id === updatedTag.id ? updatedTag : tag);
          this.tagsCache$.next(updatedTags);
          return of(updatedTags);
        })
      )
      .subscribe();
    // Также необходимо обновить тег на сервере
    this.update(updatedTag).subscribe();
  }

  deleteTagFromCache(tagId: number): void {
    this.tagsCache$
      .pipe(
        switchMap(tags => {
          const filteredTags = tags.filter(tag => tag.id !== tagId);
          this.tagsCache$.next(filteredTags);
          return of(filteredTags);
        })
      )
      .subscribe();
    // Также необходимо удалить тег на сервере
    this.delete(tagId).subscribe();
  }
}
