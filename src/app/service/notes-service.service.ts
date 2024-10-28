import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '../models';
import { DataService } from './data-service.service';

/**
 * Сервис работы с заметками.
 */
@Injectable({
  providedIn: 'root',
})
export class RequestService extends DataService<Note> {
  constructor(http: HttpClient) {
    super(http, 'api/notes');
  }
}
