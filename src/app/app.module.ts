import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThreatsComponent } from './pages/threats/threats.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api-service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './store/login/login.state';
import { environment } from '../environments/environment';
import { ScanComponent } from './pages/scan/scan.component';
import { ScanFormComponent } from './components/scan-form/scan-form.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { UserState } from './store/user/user.state';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CardComponent,
    FooterComponent,
    ThreatsComponent,
    ContactComponent,
    LoginComponent,
    ScanComponent,
    ScanFormComponent,
    InputFileComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatTooltipModule,
    NgxsModule.forRoot([LoginState, UserState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
