import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular';

/**
 * Компонент спиннера для отображения загрузки.
 */
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [DxLoadPanelModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @Input() visible: boolean = false;
}
