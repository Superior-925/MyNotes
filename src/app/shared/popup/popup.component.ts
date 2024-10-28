import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Remind} from '../../models';
import {RequestRemindService} from '../../service/reminds-service.service';
import {DxPopupModule} from 'devextreme-angular';

/**
 * Компонент отображения напоминания.
 */
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [DxPopupModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent implements OnInit {
  public remind: Remind | null = null;

  constructor(private remService: RequestRemindService) {
  }

  public ngOnInit(): void {
    this.remService.remind$.subscribe((remind) => {
      this.remind = remind;
    });
  }
}
