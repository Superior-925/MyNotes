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

}
