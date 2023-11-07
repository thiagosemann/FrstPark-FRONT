import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/utilitarios/user';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  mesAtual: string = "";
  valorTotal: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      // Se não existe um token, redirecione para a página de login
      this.router.navigate(['/login']);
    }


    this.mesAtual = this.obterMesAtual();

    const user: User | null = this.getCurrentUser();

    if (user && user.id !== undefined) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Adiciona 1 ao mês (pois os meses em JavaScript são baseados em zero)
      const monthConsulta = `${year}-${month.toString().padStart(2, '0')}`;
    }
  }



  obterMesAtual(): string {
    const currentDate = new Date();
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[currentDate.getMonth()];
  }

  getCurrentUser(): User | null {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    user = sessionStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }



  calcularValorTotal(history: any[]): void {
    this.valorTotal = history.reduce((total, item) => total + Number(item.total_cost), 0);
  }
  


}
