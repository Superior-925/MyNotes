import { Component } from '@angular/core';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxDrawerModule,
  DxListModule,
  DxPopupModule, DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,

  DxToolbarModule
} from 'devextreme-angular';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DxDrawerModule,
    DxListModule,
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    HttpClientModule,
    DxToolbarModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CommonModule],
  providers:[HttpClientModule]
})

export class AppComponent {


}
