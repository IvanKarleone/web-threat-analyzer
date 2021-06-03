import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ThreatsComponent } from './pages/threats/threats.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ROUTES } from './consts/routes';

export const routes: Routes = [
  {
    path: ROUTES.main,
    component: MainComponent,
  },
  {
    path: ROUTES.threats,
    component: ThreatsComponent
  },
  {
    path: ROUTES.contact,
    component: ContactComponent
  },
  {
    path: ROUTES.login,
    component: LoginComponent
  },
  { path: '**', redirectTo: ROUTES.main },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
