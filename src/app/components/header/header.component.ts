import { Component } from '@angular/core';
import { DxBoxModule } from 'devextreme-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DxBoxModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
