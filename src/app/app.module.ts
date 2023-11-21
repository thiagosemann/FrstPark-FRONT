import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgChartsModule } from 'ng2-charts';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { OrdenarPorPrecoPipe } from '../app/shared/pipes/ordenar-por-preco.pipe'; // ajuste o caminho conforme necessário

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './content/content.component';
import { NavBarComponent } from './content/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { ProfileComponent } from './content/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ListaVagasComponent } from './content/lista-vagas/lista-vagas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    ContentComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    RegisterComponent,
    ListaVagasComponent,
    OrdenarPorPrecoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    NgChartsModule,
    BsDatepickerModule,
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
