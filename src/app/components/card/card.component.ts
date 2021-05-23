import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() public icon: string = '';
  @Input() public title: string = '';
  @Input() public text: string = '';
}
