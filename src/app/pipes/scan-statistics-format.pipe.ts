import { Pipe, PipeTransform } from '@angular/core';
import { IAnalyzeStats } from '../intrerfaces/scan';

@Pipe({
  name: 'scanStatisticsFormat'
})
export class ScanStatisticsFormatPipe implements PipeTransform {
  transform(scanStatistics: IAnalyzeStats): [string, number][] {
    return Object.entries(scanStatistics);
  }
}
