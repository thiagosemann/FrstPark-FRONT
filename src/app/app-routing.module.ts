import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/service/authGuard';


import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ContentComponent } from './content/content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './content/profile/profile.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuardService] },
  { path: 'content/:id', component: ContentComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
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
