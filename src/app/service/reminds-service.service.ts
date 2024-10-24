import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Remind} from "../models/remind";
import {DataService} from "./data-service.service";
import {BehaviorSubject, Observable} from "rxjs";


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
}
