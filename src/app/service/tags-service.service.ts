import {Injectable} from '@angular/core';
import {Tag} from "../models";
import {DataService} from "./data-service.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagsServiceService extends  DataService<Tag>{
  constructor(http: HttpClient) {
    super(  http,'api/tags')
  }
}
