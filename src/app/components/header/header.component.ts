import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../store/login/login.actions';
import { UserState } from '../../store/user/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(UserState.isLogin) public isLogin$: Observable<boolean>;
  @Select(UserState.fullName) public userFullName$: Observable<string>;

  constructor(private store: Store) {
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
