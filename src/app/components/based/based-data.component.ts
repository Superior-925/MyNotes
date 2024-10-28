import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoadingService } from '../../service/loader.service';

export interface IDataService<T> {
  getAll: () => Observable<T[]>;
  delete: (id: number) => Observable<any>;
}

/**
 * Базовый класс-родитель для основных компонентов приложения.
 */
@Directive()
export abstract class BaseDataComponent<T> implements OnInit {
  constructor(
    protected dataService: IDataService<T>,
    protected router: Router,
    protected loadingService: LoadingService,
  ) {}

  public items: T[] = [];
  public loading: boolean = false;

  public ngOnInit(): void {
    this.loadData();
  }

  protected addItem(path: string): void {
    this.loadingService.show();
    this.router.navigate([path]);
    this.loadingService.hide();
  }

  protected deleteItem(id: number): void {
    this.loadingService.show();
    this.dataService.delete(id).subscribe(() => {
      this.loadData();
    });
    this.loadingService.hide();
  }

  private loadData(): void {
    this.loadingService.show();
    this.dataService.getAll().subscribe(
      (data: T[]) => {
        this.items = data;
        this.loadingService.hide();
      },
      (error) => {
        console.error('Failed to load items', error);
        this.loading = false;
      },
    );
  }
}
