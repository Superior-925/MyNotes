import {Injectable} from '@angular/core';
import {Note} from "../models/note";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private url = 'api/notes';

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

  getNotes(): Observable<Note[]> {
    return this.http
      .get<Note[]>(this.url)
  }

  getNote(id: number): Observable<Note> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<Note>(url)
  }

  updateNote(note: Note): any {
    return this.http
      .put(this.url, note, this.httpOptions)
  }

  addNote(note: Note): Observable<Note> {
    return this.http
      .post<Note>(this.url, note, this.httpOptions)
  }

  deleteNote(note: Note): Observable<Note> {
    const url = `${this.url}/${note.id}`;
    return this.http.delete<Note>(url, this.httpOptions)
  }


}
