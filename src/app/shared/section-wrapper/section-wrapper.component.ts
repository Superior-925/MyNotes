import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [DxButtonModule],
  templateUrl: './section-wrapper.component.html',
  styleUrl: './section-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionWrapperComponent {
  @Input() addFunc!: () => void;
  @Input() ButtonName: string = '';

  public onAdd(): void {
    this.addFunc();
  }
}
