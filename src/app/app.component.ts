import { Component } from '@angular/core';
import { DxDrawerModule, DxListModule, DxToolbarModule } from 'devextreme-angular';
import {Router, RouterModule} from '@angular/router';
import { OpenedStateMode, PanelLocation, RevealMode } from "devextreme/ui/drawer";
import { Service, List } from "./app.service";
import {AppRoutingModule} from "./app.routes";

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

  constructor(private service: Service, private router: Router) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  onNavigationItemClicked(item: List): void {
    //debugger
    const path = this.getPathByText(item.text);
    this.router.navigate([path]);
  }

  getPathByText(text: string): string {
    return text.toLowerCase();
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

}
