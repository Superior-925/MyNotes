import { Injectable } from '@angular/core';

export class List {
  id: number = 0;
  text: string = '';
  icon: string = '';
}

const navigation: List[] = [
  { id: 1, text: 'Notes', icon: 'textdocument' },
  { id: 2, text: 'Reminders', icon: 'clock' },
  { id: 3, text: 'Tags', icon: 'tags' },
];

const text = ``;

/**
 * Сервис для получения данных сайдбара.
 */
@Injectable({
  providedIn: 'root',
})
export class SidebarServiceService {
  public getNavigationList(): List[] {
    return navigation;
  }

  public getContent(): string {
    return text;
  }
}
