import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ScanState } from '../store/scan/scan.state';
import { IAnalyzeAttributes } from '../intrerfaces/scan';
import { Injectable } from '@angular/core';
import { ROUTES } from '../consts/routes.const';

@Injectable()
export class ScanResultsGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {
  }

  canActivate(): boolean {
    const scanResults = this.store.selectSnapshot<IAnalyzeAttributes>(ScanState.analyzeData);

    if (scanResults === null) {
      this.router.navigate([ROUTES.main]);
      return false;
    }
    return true;
  }
}
