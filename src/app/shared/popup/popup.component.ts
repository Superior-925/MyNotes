import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Remind } from '../../models';
import { RequestRemindService } from '../../service/reminds-service.service';
import { DxPopupModule } from 'devextreme-angular';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [DxPopupModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit, OnDestroy {
  public remind: Remind | null = null;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private remService: RequestRemindService) {}

  public ngOnInit(): void {
    this.remService.remind$.pipe(takeUntil(this.unsubscribe$)).subscribe((remind) => {
      this.remind = remind;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
