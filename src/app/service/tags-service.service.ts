import { Injectable } from '@angular/core';
import { Tag } from "../models";
import { DataService } from "./data-service.service";
import { HttpClient } from "@angular/common/http";
import {  Observable,  ReplaySubject, switchMap, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService extends DataService<Tag> {
  private tagsCache$: ReplaySubject<Tag[]> = new ReplaySubject(1);

  constructor(http: HttpClient) {
    super(http, 'api/tags');
    this.loadTags(); // Загрузка тегов при инициализации
  }

   loadTags(): void {
    this.getAll()
      .pipe(tap(tags => this.tagsCache$.next(tags)))
      .subscribe();
  }

  getCachedTags(): Observable<Tag[]> {
    return this.tagsCache$.asObservable();
  }

  addTagToCache(newTag: Tag): void {
    this.add(newTag).pipe(
      switchMap(savedTag => {
        return this.getCachedTags().pipe(
          tap(tags => {
            const updatedTags = [...tags, savedTag];
            this.tagsCache$.next(updatedTags);
          })
        );
      })
    ).subscribe();
  }

  updateTagInCache(updatedTag: Tag): void {
    this.update(updatedTag).pipe(
      switchMap(() => this.getCachedTags()),
      tap(tags => {
        const updatedTags = tags.map(tag => tag.id === updatedTag.id ? updatedTag : tag);
        this.tagsCache$.next(updatedTags);
      })
    ).subscribe();
  }

  deleteTagFromCache(tagToDelete: Tag): void {
    this.delete(tagToDelete.id).pipe(
      switchMap(() => this.getCachedTags()),
      tap(tags => {
        const filteredTags = tags.filter(tag => tag.id !== tagToDelete.id);
        this.tagsCache$.next(filteredTags);
      })
    ).subscribe();
  }
}
