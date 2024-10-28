import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { Remind, Tag } from '../models';
import { DataService } from './data-service.service';

/**
 * Сервис работы с напоминаниями.
 */
@Injectable({
  providedIn: 'root',
})
export class RequestRemindService extends DataService<Remind> {
  private remindSubject = new BehaviorSubject<Remind | null>(null);
  remind$: Observable<Remind | null> = this.remindSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, 'api/reminders');
  }

  public setReminder(remind: Remind) {
    const now = new Date();
    const remindTime = new Date(remind.remindMe).getTime() - now.getTime();
    if (remindTime > 0) {
      setTimeout(() => {
        this.remindSubject.next(remind);
        this.clearReminder();
      }, remindTime);
    }
  }

  public updateTagInReminds(updatedTag: Tag): Observable<any> {
    return this.getAll().pipe(
      switchMap((reminds) => {
        const updatedReminds = reminds.map((remind) => {
          const tagIndex = remind.tags.findIndex((tag) => tag.id === updatedTag.id);
          if (tagIndex > -1) {
            remind.tags[tagIndex] = updatedTag;
          }
          return remind;
        });
        return this.updateRemindsInDb(updatedReminds);
      }),
    );
  }

  public deleteTagFromReminds(tagId: number): Observable<any> {
    return this.getAll().pipe(
      switchMap((reminds) => {
        const updatedReminds = reminds.map((remind) => ({
          ...remind,
          tags: remind.tags.filter((tag) => tag.id !== tagId),
        }));
        return this.updateRemindsInDb(updatedReminds);
      }),
    );
  }

  private updateRemindsInDb(reminds: Remind[]): Observable<Remind[]> {
    return this.http.post<Remind[]>('api/reminders', reminds);
  }

  private clearReminder(): void {
    this.remindSubject.next(null);
  }
}
