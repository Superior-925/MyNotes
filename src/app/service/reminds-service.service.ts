import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Remind} from "../models/remind";
import {DataService} from "./data-service.service";


@Injectable({
  providedIn: 'root'
})
export class RequestRemindService extends  DataService<Remind> {
  constructor(http: HttpClient) {
    super(  http,'api/reminders')
  }

}
