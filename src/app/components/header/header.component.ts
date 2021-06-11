import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../store/login/login.actions';
import { UserState } from '../../store/user/user.state';
import { ScanState } from '../../store/scan/scan.state';
import { IAnalyzeAttributes } from '../../intrerfaces/scan';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(UserState.isLogin) public isLogin$: Observable<boolean>;
  @Select(UserState.fullName) public userFullName$: Observable<string>;
  @Select(ScanState.analyzeData) public analyzeData$: Observable<IAnalyzeAttributes>;

  constructor(private store: Store) {
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
