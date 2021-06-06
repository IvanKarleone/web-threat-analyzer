import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScanType } from './scan.const';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanComponent {
  public scanType: ScanType = ScanType.url;

  constructor() {
  }

  public onSetScanType(scanType: ScanType): void {
    this.scanType = scanType;
  }
}
