import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Variáveis para armazenar os valores dos campos de entrada
  username: string;
  password: string;
  rememberMe:boolean;

  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {
    this.username = '';
    this.password = '';
    this.rememberMe = false;
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      // Se não existe um token, redirecione para a página de login
      this.router.navigate(['/content']);
    } 
  }

  login(): void {
    // Lógica de autenticação aqui
    if (!this.username && !this.password) {
      this.toastr.error("Digite o login e a senha!");
      return;
    }
  
    if (!this.username) {
      this.toastr.error("Digite o login!");
      return;
    }
  
    if (!this.password) {
      this.toastr.error("Digite a senha!");
      return;
    }
    
    this.authService.login(this.username,  this.password, this.rememberMe).then(result => {
      if (result.logado) {
        const user = this.authService.getUser()
        if(user && user.role.toUpperCase() == 'ADMIN'){
          this.toastr.success("Bem vindo admin!")
          this.router.navigate(['/admin']);
          return;
        }
        this.toastr.success("Logado com sucesso!")
        this.router.navigate(['/content']);
      } else {
        this.toastr.error(result.erro)
      }
    }).catch(error => {
      this.toastr.error(error.erro)
    });


  }
}