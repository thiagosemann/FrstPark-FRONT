import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent  implements OnInit  {
  componenteAtual: string = 'buildings'; // Define o componente inicial a ser carregado (por exemplo, "home")
  constructor(
    private router: Router,
    private authentication: AuthenticationService,

  ){}

  ngOnInit(): void {
    const user = this.authentication.getUser();
   
    if (user && user.role.toLocaleUpperCase() != 'ADMIN' &&  user.role.toLocaleUpperCase() != 'SINDICO' ) {
      this.router.navigate(['/content']);
      return;
    }
  }

  onComponenteSelecionado(componente: string) {
    this.componenteAtual = componente;
  }
}
