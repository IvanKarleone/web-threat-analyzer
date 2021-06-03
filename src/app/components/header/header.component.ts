import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginState } from '../../store/login/login.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../store/login/login.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Select(LoginState.isLogin) public isLogin$: Observable<boolean>;

  constructor(private store: Store) {
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
