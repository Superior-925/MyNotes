import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Note, Remind, Tag } from '../models';

/**
 * Сервис имитации базы данных для функционирования приложения.
 */
@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes: Note[] = [
      {
        id: 1,
        title: 'Some task',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      },
      {
        id: 2,
        title: 'My task',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      },
      {
        id: 3,
        title: 'Any task',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      },
      {
        id: 4,
        title: 'Other Task',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
      },
    ];
    const tags: Tag[] = [
      { id: 1, tagTitle: 'Покупки' },
      { id: 2, tagTitle: 'Почитать' },
      { id: 3, tagTitle: 'Посмотреть' },
      { id: 4, tagTitle: 'Документы' },
      { id: 5, tagTitle: 'Домашние дела' },
      { id: 6, tagTitle: 'Продуктивности' },
    ];
    const reminders: Remind[] = [
      {
        id: 1,
        title: 'Оплатить интернет',
        tags: [tags[5]],
        deadline: new Date('2024-10-26T17:00:00'),
        remindMe: new Date('2024-10-25T10:00:00'),
      },
      {
        id: 2,
        title: 'Настроить Astra Linux',
        tags: [tags[5]],
        deadline: new Date('2024-10-27T10:00:00'),
        remindMe: new Date('2024-10-26T17:00:00'),
      },
      {
        id: 3,
        title: 'Записаться к врачу',
        tags: [tags[5]],
        deadline: new Date('2024-10-25T17:00:00'),
        remindMe: new Date('2024-10-23T10:00:00'),
      },
      {
        id: 4,
        title: 'Посмотреть запись IT конференции',
        tags: [tags[5]],
        deadline: new Date('2024-10-28T17:00:00'),
        remindMe: new Date('2024-10-25T10:00:00'),
      },
      {
        id: 5,
        title: 'Покататься на велосипеде',
        tags: [tags[2], tags[1]],
        deadline: new Date('2024-10-27T17:00:00'),
        remindMe: new Date('2024-10-26T10:00:00'),
      },
      {
        id: 6,
        title: 'Сходить в магазин',
        tags: [tags[3], tags[1]],
        deadline: new Date('2024-10-24T17:00:00'),
        remindMe: new Date('2024-10-23T10:00:00'),
      },
      {
        id: 7,
        title: 'Купить книги',
        tags: [tags[0]],
        deadline: new Date('2024-10-22T17:00:00'),
        remindMe: new Date('2024-10-21T10:00:00'),
      },
    ];

    return { notes, reminders, tags };
  }
}
