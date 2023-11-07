import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/utilitarios/user';
import { UsageHistoryService } from 'src/app/shared/service/usageHistory_service';

@Component({
  selector: 'app-log-gastos',
  templateUrl: './log-gastos.component.html',
  styleUrls: ['./log-gastos.component.css']
})
export class LogGastosComponent implements OnInit {
  users: User[] = [];
  userUsageHistory: any[] = [];
  formattedUsageHistory: any[] = [];

  constructor(private usageHistoryService: UsageHistoryService) {}

  ngOnInit() {
    const user: User | null = this.getCurrentUser();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adiciona 1 ao mês (pois os meses em JavaScript são baseados em zero)
    const monthConsulta = `${year}-${month.toString().padStart(2, '0')}`;
    if (user && user.id !== undefined) {
      this.usageHistoryService.getUserUsageHistory(user.id,monthConsulta)
        .subscribe({
          next: history => {
            this.userUsageHistory = history;
            this.formatUsageHistory(user);
          },
          error: error => {
            console.log('Error getting user usage history:', error);
          }
        });

    }
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

  formatUsageHistory(user: User) {
    this.formattedUsageHistory = this.userUsageHistory.map(history => ({
      start_time: history.start_time 
        ? new Date(history.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        : "--",
      end_time: history.end_time 
        ? new Date(history.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        : "--",
      building: user.building_name,
      date: history.end_time 
        ? new Date(history.end_time).toLocaleDateString() 
        : "--",
      total_cost: history.total_cost 
        ? parseFloat(history.total_cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
        : "--"
    }));

    this.formattedUsageHistory.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
