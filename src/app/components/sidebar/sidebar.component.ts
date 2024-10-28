import { Component } from '@angular/core';
import { DxDrawerModule, DxListModule, DxToolbarModule } from 'devextreme-angular';
import { Router, RouterModule } from '@angular/router';

import { List, SidebarServiceService as Service } from '../../service/sidebar-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DxDrawerModule, DxListModule, RouterModule, DxToolbarModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public isDrawerOpen = true;
  public text: string;
  public navigation: List[];

  constructor(
    private service: Service,
    private router: Router,
  ) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [
    {
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'menu',
        stylingMode: 'text',
        onClick: () => (this.isDrawerOpen = !this.isDrawerOpen),
      },
    },
  ];

  public onNavigationItemClicked(item: List): void {
    const path = this.getPathByText(item.text);
    this.router.navigate([path]);
  }

  private getPathByText(text: string): string {
    return text.toLowerCase();
  }
}
