import {Injectable} from '@angular/core';
import {Note} from "../models/note";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DataService} from "./data-service.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService extends  DataService<Note>{
  constructor(http: HttpClient) {
    super(  http,'api/notes')
  }
}
