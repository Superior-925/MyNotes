import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Remind} from "../models/remind";
import {DataService} from "./data-service.service";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {Tag} from "../models";


@Injectable({
  providedIn: 'root'
})
export class RequestRemindService extends  DataService<Remind> {

  private remindSubject = new BehaviorSubject<Remind | null>(null);
  remind$: Observable<Remind | null> = this.remindSubject.asObservable();

  constructor(http: HttpClient) {
    super(  http,'api/reminders')
  }

  setReminder(remind: Remind) {
    const now = new Date();
    const remindTime = new Date(remind.remindMe).getTime() - now.getTime();
    console.log('set Reminder')
    console.log(remindTime)
    if (remindTime > 0) {
      setTimeout(() => {
        this.remindSubject.next(remind);
        this.clearReminder()
      }, remindTime);
    }
  }

  clearReminder() {
    this.remindSubject.next(null);
  }

  private updateRemindsInDb(reminds: Remind[]): Observable<Remind[]> {
    //return of(reminds);
    return this.http.post<Remind[]>('api/reminders',reminds)
  }


  updateTagInReminds(updatedTag: Tag): Observable<any> {
    return this.getAll().pipe(
      switchMap(reminds => {
        const updatedReminds = reminds.map(remind => {
          const tagIndex = remind.tags.findIndex(tag => tag.id === updatedTag.id);
          if (tagIndex > -1) {
            remind.tags[tagIndex] = updatedTag;
          }
          return remind;
        });
        return this.updateRemindsInDb(updatedReminds);
      })
    );
  }

  deleteTagFromReminds(tagId: number): Observable<any> {
    return this.getAll().pipe(
      switchMap(reminds => {
        const updatedReminds = reminds.map(remind => ({
          ...remind,
          tags: remind.tags.filter(tag => tag.id !== tagId),
        }));
        return this.updateRemindsInDb(updatedReminds);
      })
    );
  }


}
/*
deleteTagFromReminds(tagId: number): Observable<any> {
  return this.getAll().pipe(
    switchMap(reminds => {
      const updatedReminds = reminds.map(remind => {
        remind.tags = remind.tags.filter(tag => tag.id !== tagId);
        return remind;
      });
      // Аналогично обновляем напоминания в базе данных
      return this.updateRemindsInDb(updatedReminds);
    })
  );
}*/
