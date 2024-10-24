import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Note} from "../models/note";
import {Remind, Tag} from "../models";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tags: Tag[] = [
      {id:1, tagTitle:'👛 Покупки'},
      {id:2, tagTitle:'📖 Почитать'},
      {id:3, tagTitle:'📺 Посмотреть'},
      {id:4, tagTitle:'🗂️ Документы'},
      {id:5, tagTitle:'🧹 Домашние дела'},
      {id:6, tagTitle:'🔥 Продуктивности'},
    ]
    const notes:Note[] = [
      {
        id: 1,
        title: 'Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',

      },
      {
        id: 2,
        title: 'Some text',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',

      },
      {
        id: 3,
        title: 'Any Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',

      },
      {
        id: 4,
        title: 'Any Many Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',

      },
    ];
    const reminders :Remind[] = [
      {
        id: 1,
        title: 'Сделать тестовое задание 🌈',
        tags: [tags[5]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),

      },
      {
        id: 2,
        title: 'Не забыть поспать 🌚',
        tags: [tags[5]],
        deadline: new Date('2024-03-11T10:00:00'),
        remindMe: new Date('2024-04-11T17:00:00'),
      },
      {
        id: 3,
        title: 'Не забыть выпить норму воды 💧',
        tags: [tags[5]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
      {
        id: 4,
        title: 'Потренить 💪💪💪 ',
        tags: [tags[5]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
      {
        id: 5,
        title: 'Американский Психопат ',
        tags: [tags[2],tags[1]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
      {
        id: 6,
        title: 'Подать показания водомеров ',
        tags: [tags[3],tags[1]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
      {
        id: 7,
        title: 'Заказать пряжу на игрушки',
        tags: [tags[0]],
        deadline: new Date('2024-04-11T17:00:00'),
        remindMe: new Date('2024-03-11T10:00:00'),
      },
    ];

    return { notes,reminders, tags }
  }

  generateID(notes: Note[]): number {
    return notes.length > 0
      ? Math.max(...notes.map((user) => user.id)) + 1
      : 42
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

