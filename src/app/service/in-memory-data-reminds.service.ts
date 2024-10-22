/*
import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class RequestRemindService implements InMemoryDbService {
  createDb() {
    const reminders = [
      {
        id: 1,
        title: 'Сделать тестовое задание 🌈',
        tags: ['critical'],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),

      },
      {
        id: 2,
        title: 'Не забыть поспать 🌚',
        tags: ['high'],
        deadline: new Date('2024-03-11T10:00:00'),
        remindMe: new Date('2024-04-11T17:00:00'),
      },
      {
        id: 3,
        title: 'Не забыть выпить норму воды 💧',
        tags: ['medium'],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
      {
        id: 4,
        title: 'Потренить 💪💪💪 ',
        tags: ['low'],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
    ];
    return { reminders }
  }

  getDate(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

}
*/
