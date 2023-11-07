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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin-panel/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './content/content.component';
import { NavBarComponent } from './content/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StatusMaquinasComponent } from './content/status-maquinas/status-maquinas.component';
import { LogGastosComponent } from './content/log-gastos/log-gastos.component';
import { LogMensalComponent } from './content/log-mensal/log-mensal.component';
import { QrCodeScannerComponent } from './content/qr-code-scanner/qr-code-scanner.component';
import { MenuLateralComponent } from './admin-panel/menu-lateral/menu-lateral.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { BuildingsControlComponent } from './admin-panel/buildings-control/buildings-control.component';
import { ProfileComponent } from './content/profile/profile.component';
import { UserControlComponent } from './admin-panel/user-control/user-control.component';
import { MachinesControlComponent } from './admin-panel/machines-control/machines-control.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    ContentComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    StatusMaquinasComponent,
    LogGastosComponent,
    LogMensalComponent,
    QrCodeScannerComponent,
    MenuLateralComponent,
    AdminPanelComponent,
    BuildingsControlComponent,
    ProfileComponent,
    UserControlComponent,
    MachinesControlComponent,
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
