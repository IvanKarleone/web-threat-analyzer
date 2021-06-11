import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { ScanState } from '../../store/scan/scan.state';
import { Observable } from 'rxjs';
import { IAnalyzeAttributes, SCAN_CATEGORY } from '../../intrerfaces/scan';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent {
  @Select(ScanState.analyzeData) analyzeData$: Observable<IAnalyzeAttributes>;
  @Select(ScanState.scannedUrl) scannedUrl$: Observable<string>;

  public scanCategory = SCAN_CATEGORY;

  public getTableCellClassName(category: string): string {
    return `${this.scanCategory[category]} table-cell-2`;
  }
}
