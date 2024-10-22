import { Component } from '@angular/core';
import { DxDrawerModule, DxListModule, DxToolbarModule } from 'devextreme-angular';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CommonModule} from "@angular/common";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./service/in-memory-data.service";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [DxDrawerModule,
    DxListModule,
    HttpClientModule,
    RouterModule,
    DxToolbarModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    CommonModule],
  providers:[HttpClientModule]
})

export class AppComponent {


}
