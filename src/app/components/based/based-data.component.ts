import {Directive, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";
import {LoadingService} from "../../service/loader.service";

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
    protected router: Router,
    protected loadingService: LoadingService
  ) {
  }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadingService.show()
    this.dataService.getAll().subscribe(
      (data: T[]) => {
        this.items = data;
        this.loadingService.hide()
      },
      (error) => {
        console.error("Failed to load items", error);
        this.loading = false;
      }
    );
  }

  addItem(path: string): void {
    this.loadingService.show()
    this.router.navigate([path]);
    this.loadingService.hide()
  }

  deleteItem(id: number): void {
    this.loadingService.show()
    this.dataService.delete(id).subscribe(() => {
      this.loadData();
    });
    this.loadingService.hide()
  }
}
