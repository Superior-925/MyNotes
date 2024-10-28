import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DxBoxModule } from 'devextreme-angular';

/**
 * Компонент шапки приложения.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DxBoxModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
