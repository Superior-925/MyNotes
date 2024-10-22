import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Remind} from "../models/remind";

@Injectable({
  providedIn: 'root'
})
export class RequestRemindService {
  private url = 'api/reminders';

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient) {
  }

  getReminds(): Observable<Remind[]> {
    return this.http
      .get<Remind[]>(this.url)
  }

  getRemind(id: number): Observable<Remind> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<Remind>(url)
  }

  updateRemind(remind: Remind): any {
    return this.http
      .put(this.url, remind, this.httpOptions)
  }

  addRemind(remind: Remind): Observable<Remind> {
    return this.http
      .post<Remind>(this.url, remind, this.httpOptions)
  }

  deleteRemind(remind: Remind): Observable<Remind> {
    const url = `${this.url}/${remind.id}`;
    return this.http.delete<Remind>(url, this.httpOptions)
  }
}
