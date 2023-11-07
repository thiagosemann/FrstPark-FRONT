import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/service/authentication';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any = null; // Use o tipo de dado adequado para o usuário
  isMenuOpen = false;
  isDesktopView = true; // Adicionamos essa propriedade para controlar a exibição no desktop ou celular

  constructor(private authService: AuthenticationService, private router: Router, private toastr: ToastrService) {
    // Adicionamos o evento de redimensionamento (resize) para atualizar a exibição do menu quando a janela for redimensionada
    window.addEventListener('resize', () => this.checkViewport());
  }
  
  ngOnInit(): void {
    this.user = this.authService.getUser(); // use o método apropriado para obter as informações do usuário
    this.checkViewport();
  }

  logout(): void {
    this.authService.logout();
    this.toastr.error('Deslogado.');
    this.router.navigate(['/login']);
  }

  content(): void {
    this.router.navigate(['/content']);
  }
  profile(): void {
    this.router.navigate(['/profile']);
  }
  admin(): void {
      this.router.navigate(['/admin']);
  }
  predios(): void {
    this.router.navigate(['/admin/buildings']);
  }
  usuarios(): void {
    this.router.navigate(['/admin/userControl']);
  }
  maquinas(): void {
    this.router.navigate(['/admin/machinesControl']);
  }
    
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private checkViewport() {
    // Obtém a largura atual da janela
    const width = window.innerWidth;

    // Defina a variável isDesktopView para verdadeiro se a largura for maior que 768px
    this.isDesktopView = width > 990;

    // Fecha o menu (menu sanduíche) quando a tela for de desktop
    if (this.isDesktopView) {
      this.isMenuOpen = false;
    }
  }
}
