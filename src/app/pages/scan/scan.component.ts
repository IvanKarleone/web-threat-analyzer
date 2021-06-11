import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScanType } from './scan.const';
import { GetAnalyzeData, GetAnalyzeDataSuccess, GetUrlId, GetUrlIdSuccess, SetScanType, SetUrl } from '../../store/scan/scan.actions';
import { Actions, ofActionCompleted, Select, Store } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../../consts/routes.const';
import { ScanState } from '../../store/scan/scan.state';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanComponent {
  @Select(UserState.isLogin) isLogin$: Observable<boolean>;
  @Select(ScanState.scanType) scanType$: Observable<ScanType>;
  @Select(ScanState.message) scanMessage$: Observable<string>;

  constructor(private store: Store, private actions: Actions, private router: Router) {
    this.initGetUrlIdSuccess();
    this.initGetAnalyzeDataSuccess();
  }

  public onSetScanType(scanType: ScanType): void {
    this.store.dispatch(new SetScanType(scanType));
  }

  public onScanUrl(url: string): void {
    this.store.dispatch([
      new SetUrl(url),
      new GetUrlId(url)
    ]);
  }

  private initGetUrlIdSuccess(): void {
    this.actions.pipe(
      ofActionCompleted(GetUrlIdSuccess),
    ).subscribe(() => this.store.dispatch(new GetAnalyzeData()));
  }

  private initGetAnalyzeDataSuccess(): void {
    this.actions.pipe(
      ofActionCompleted(GetAnalyzeDataSuccess),
    ).subscribe(() => {
      this.router.navigate([ROUTES.scanResults]);
    });
  }
}
