import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/service/authGuard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin-panel/register/register.component';
import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './content/content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { QrCodeScannerComponent } from './content/qr-code-scanner/qr-code-scanner.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProfileComponent } from './content/profile/profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuardService] },
  { path: 'content/:id', component: ContentComponent, canActivate: [AuthGuardService] },
  {
    path: 'admin',
    redirectTo: 'admin/buildings',
    pathMatch: 'full'
  },
  {
    path: 'admin/:componente',
    component: AdminPanelComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'qrCode', component: QrCodeScannerComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: '/content', pathMatch: 'full' }, // redireciona para '/home' quando o caminho é vazio
  { path: '**', component: ContentComponent, canActivate: [AuthGuardService] }, // rota de fallback quando nenhuma outra corresponder

  // Outras rotas do seu aplicativo
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
