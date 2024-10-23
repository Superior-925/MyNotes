import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../../models/note";
import {Remind} from "../../../models/remind";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestRemindService} from "../../../service/reminds-service.service";
import {
  DxButtonModule,
  DxDateBoxModule,
  DxPopupModule,
  DxTagBoxModule,
  DxTextAreaModule,
  DxTextBoxModule
} from "devextreme-angular";
import {Tag} from "../../../models";
import {TagsServiceService} from "../../../service/tags-service.service";

@Component({
  selector: 'app-remind-details',
  standalone: true,
  imports: [
    DxPopupModule,
    DxTextBoxModule,
    DxTextAreaModule,
    DxTagBoxModule,
    DxDateBoxModule,
    DxButtonModule
  ],
  templateUrl: './remind-details.component.html',
  styleUrl: './remind-details.component.css'
})
export class RemindDetailsComponent {
  @Output() close = new EventEmitter<void>();
  @Input() remind!: Remind;
  tags: Tag[] = []

  isPopupVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reqService: RequestRemindService,
    private router: Router,
    private tagsService : TagsServiceService
  ){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.reqService.getRemind(params['id']).subscribe((res:Remind) =>{
        this.remind =res;
        this.isPopupVisible = true
      })
    })

    this.tagsService.getTags().subscribe((tags) => {
      this.tags = tags
    })
  }



  closePopup(): void {
    this.isPopupVisible = false;
    this.close.emit();
    this.router.navigate(['reminders'])
  }

  save():void {
    this.reqService
      .updateRemind(this.remind)
      .subscribe(() => this.router.navigate(['reminders']))
  }
}
