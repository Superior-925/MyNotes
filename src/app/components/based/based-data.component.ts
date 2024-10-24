import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs";

export interface IDataService<T> {
  getAll: () => Observable<T[]>;
  delete: (id: number) => Observable<any>;
  // Дополнительно можно добавить методы add и update, если нужно
}


@Directive()
export abstract class BaseDataComponent<T> implements OnInit {
  items: T[] = [];
  loading: boolean = false;

  constructor(
    protected dataService: IDataService<T>,
    protected router: Router) {}


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.dataService.getAll().subscribe(
      (data: T[]) => {
        this.items = data;
        this.loading = false;
      },
      (error) => {
        console.error("Failed to load items", error);
        this.loading = false;
      }
    );
  }

  addItem(path: string): void {
  this.router.navigate([path]);
  }

  deleteItem(id: number): void {
    this.dataService.delete(id).subscribe(() => {
      this.loadData();
    });
  }
}
