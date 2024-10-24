import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class DataService<T> {
  protected url: string;
  protected httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(protected http: HttpClient, url: string) {
    this.url = url;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  update(entity: T): Observable<any> {
    return this.http.put(this.url, entity, this.httpOptions);
  }

  add(entity: T): Observable<T> {
    return this.http.post<T>(this.url, entity, this.httpOptions);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url}/${id}`, this.httpOptions);
  }
}
