import { Component } from '@angular/core';
import { DxDrawerModule, DxListModule, DxToolbarModule } from 'devextreme-angular';
import { RouterModule } from '@angular/router';
import { OpenedStateMode, PanelLocation, RevealMode } from "devextreme/ui/drawer";
import { Service, List } from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DxDrawerModule, DxListModule, RouterModule, DxToolbarModule]
})

export class AppComponent {
  selectedOpenMode: OpenedStateMode = 'shrink';
  isDrawerOpen = true;
  selectedPosition: PanelLocation = 'left';
  selectedRevealMode: RevealMode = 'slide';
  text: string;
  navigation: List[];

  constructor(service: Service) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [{
    widget: 'dxButton',
    location: 'before',
    options: {
      icon: 'menu',
      stylingMode: 'text',
      onClick: () => this.isDrawerOpen = !this.isDrawerOpen,
    },
  }];

  onNavigationItemClicked(e: any): void {
    // Реализация навигации
  }
}
