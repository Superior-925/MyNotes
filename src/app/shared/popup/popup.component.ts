import {Component, OnInit} from '@angular/core';
import {Remind} from "../../models";
import {RequestRemindService} from "../../service/reminds-service.service";
import {DxPopupModule} from "devextreme-angular";

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    DxPopupModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  remind: Remind | null = null;
  constructor(private remService: RequestRemindService) {}

  ngOnInit(): void {
    this.remService.remind$.subscribe(remind => {
      this.remind = remind;
    });
  }
}
