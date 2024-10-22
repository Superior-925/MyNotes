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
        date: '11.03.2024',
        deadline: '11.04.2024'
      },
      {
        id: 2,
        title: 'Some text',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['high'],
        date: '14.02.2024',
        deadline: '28.03.2024'
      },
      {
        id: 3,
        title: 'Any Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['medium'],
        date: '7.02.2024',
        deadline: '7.03.2024',
      },
      {
        id: 4,
        title: 'Any Many Task',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
        tags: ['low'],
        date: '14.03.2024',
        deadline: '7.04.2024'
      },
    ];
    return { notes }
  }

  generateID(notes: Note[]): number {
    return notes.length > 0
      ? Math.max(...notes.map((user) => user.id)) + 1
      : 42
  }

  getDate(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    return formattedDate;
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
