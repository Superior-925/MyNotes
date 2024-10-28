import { Component } from '@angular/core';
import { DxBoxModule } from 'devextreme-angular';

/**
 * Компонент-футер приложения.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DxBoxModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
