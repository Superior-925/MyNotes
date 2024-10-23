import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../models";

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService {
  private url = 'api/tags';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient) {
  }

  getTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(this.url)
  }

  getTag(id: number): Observable<Tag> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<Tag>(url)
  }

  updateTag(tag: Tag): any {
    return this.http
      .put(this.url, tag, this.httpOptions)
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http
      .post<Tag>(this.url, tag, this.httpOptions)
  }

  deleteTag(tag: Tag): Observable<Tag> {
    const url = `${this.url}/${tag.id}`;
    return this.http.delete<Tag>(url, this.httpOptions)
  }
}
