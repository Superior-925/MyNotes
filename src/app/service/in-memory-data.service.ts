import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Note} from "../models/note";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      {
        id: 1,
        title: 'Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['critical'],
        date: new Date('2024-03-11T10:00:00'), // Добавлено время
        deadline: new Date('2024-04-11T17:00:00'), // Добавлено время
      },
      {
        id: 2,
        title: 'Some text',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['high'],
        date: new Date('2024-03-11T10:00:00'), // Добавлено время
        deadline: new Date('2024-04-11T17:00:00'), // Добавлено время
      },
      {
        id: 3,
        title: 'Any Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['medium'],
        date: new Date('2024-03-11T10:00:00'), // Добавлено время
        deadline: new Date('2024-04-11T17:00:00'), // Добавлено время
      },
      {
        id: 4,
        title: 'Any Many Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['low'],
        date: new Date('2024-03-11T10:00:00'), // Добавлено время
        deadline: new Date('2024-04-11T17:00:00'), // Добавлено время
      },
    ];
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
    return { notes,reminders }
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

  IsDeadlineTomorrow(note: Note): void {
    const currentDate = new Date(note.date);
    const deadlineDate = new Date(note.deadline);

    if (note.deadline && !isNaN(deadlineDate.getTime())) {

      currentDate.setHours(0, 0, 0, 0);
      deadlineDate.setHours(0, 0, 0, 0);

      const tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

      if (deadlineDate.getTime() === tomorrow.getTime()) {
        console.log("Deadline is tomorrow!");
        // Здесь вы можете добавить код для уведомления пользователя, например, через alert или уведомление
      }
    }
  }
}
