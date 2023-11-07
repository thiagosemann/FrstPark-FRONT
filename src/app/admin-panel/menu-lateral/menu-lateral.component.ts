import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication';
import { User } from 'src/app/shared/utilitarios/user';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  @Output() componenteSelecionado = new EventEmitter<string>();
  componente: string = ''; // Inicialização com valor padrão
  user: any = null; // Use o tipo de dado adequado para o usuário

  constructor(private route: ActivatedRoute, private router: Router,private authService: AuthenticationService){}

  ngOnInit() {
    this.user = this.authService.getUser(); // use o método apropriado para obter as informações do usuário

    this.route.params.subscribe(params => {
      this.componente = params['componente'];
      this.selecionarComponente(this.componente)
      // Agora, você pode usar this.componente para determinar qual componente carregar
    });
  }
  
  selecionarComponente(componente: string) {
    this.componenteSelecionado.emit(componente);
  }
  selecionarRota(componente: string) {
    // Construa a rota desejada com base no componente
    const rota = 'admin/' + componente;
  
    // Navegue para a rota
    this.router.navigate([rota]);
  }
  
}
