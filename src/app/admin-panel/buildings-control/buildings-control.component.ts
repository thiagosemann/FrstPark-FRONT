import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/service/authentication';
import { BuildingService } from 'src/app/shared/service/buildings_service';
import { UserService } from 'src/app/shared/service/user_service';
import { Building } from 'src/app/shared/utilitarios/buildings';
import { User } from 'src/app/shared/utilitarios/user';
import { FormGroup, FormControl } from '@angular/forms'; // Import form-related modules
import { Machine } from 'src/app/shared/utilitarios/machines';
import { MachineService } from 'src/app/shared/service/machines_service';
import { NodemcuService } from 'src/app/shared/service/nodemcu_service';
import { UsageHistory } from 'src/app/shared/utilitarios/usageHistory';
import { UsageHistoryService } from 'src/app/shared/service/usageHistory_service';
import { TransactionsService } from 'src/app/shared/service/transactionsService';
import { Transaction } from 'src/app/shared/utilitarios/transactions';
import { GerenciadorMaquinasService } from 'src/app/shared/service/gerenciadorMaquinas';
import { ExcelService } from 'src/app/shared/service/excelService';

@Component({
  selector: 'app-buildings-control',
  templateUrl: './buildings-control.component.html',
  styleUrls: ['./buildings-control.component.css']
})

export class BuildingsControlComponent implements OnInit {
  buildings: Building[] = [];
  users: User[] = [];
  myGroup: FormGroup; // Add a FormGroup property
  machines: Machine[] = [];
  selectedMonth: string ="";
  selectedYear: string ="";
  buildingId: number =0;
  valorTotal: number = 0;
  userRole:string = "";
  // Adicione a propriedade 'selectedUserGastos' ao seu componente
  selectedUser: User | null = null;
  selectedUserGastos: any[] = []; // Substitua 'any[]' pelo tipo apropriado
  showUserDetails = false;
  usageHistory: any[] = [];
  formattedUsageHistory: any[] = [];
  months:any[] =[ {name:"Janeiro",id:'01'},
                  {name:"Fevereiro",id:'02'},
                  {name:"Março",id:'03'},
                  {name:"Abril",id:'04'},
                  {name:"Maio",id:'05'},
                  {name:"Junho",id:'06'},
                  {name:"Julho",id:'07'},
                  {name:"Agosto",id:'08'},
                  {name:"Setembro",id:'09'},
                  {name:"Outubro",id:'10'},
                  {name:"Novembro",id:'11'},
                  {name:"Dezembro",id:'12'}
              ];
  years:any[] =["2023","2024","2025","2026","2027","2028",];    
  consultaBDMonth: string ="";        
  excelArray : UsageHistory[] = [];
  user: any = null; // Use o tipo de dado adequado para o usuário


  constructor(
    private buildingService: BuildingService,
    private authentication: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private machineService: MachineService,
    private nodeMcuService: NodemcuService,
    private usageHistoryService: UsageHistoryService,
    private transactionsService: TransactionsService,
    private gerenciadorMaquinasService: GerenciadorMaquinasService,
    private excelService: ExcelService,
    private authService: AuthenticationService,


  ) {
    this.myGroup = new FormGroup({
      building_id: new FormControl(''), // Create a form control for 'building_id'
      month_id: new FormControl(''), // Create a form control for 'building_id'
      year_id: new FormControl('') // Create a form control for 'building_id'
    });
  }

  ngOnInit(): void {
    const user = this.authentication.getUser();
    this.userRole = user!.role.toLocaleUpperCase();
    this.manageSindico();
    this.buildingService.getAllBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings; // Set the value inside the subscription

        this.selectedYear = new Date().getFullYear().toString(); // Current year
        this.selectedMonth = (new Date().getMonth() + 1).toString().padStart(2, '0'); // Current month
        this.buildingId = user?.building_id!;
        this.consultaBDMonth = this.selectedYear + "-"+ this.selectedMonth
        this.updatePage();

        // Certifique-se de que this.myGroup não é nulo antes de acessar seus controles
        if (this.myGroup) {
          this.myGroup.get('building_id')?.setValue(this.buildingId);
          this.myGroup.get('month_id')?.setValue(this.selectedMonth);

          this.myGroup.get('year_id')?.setValue(this.selectedYear);
        }
      },
      (error) => {
        console.error('Error fetching buildings:', error);
      }
    );

  }

  manageSindico():void{
    this.user = this.authService.getUser(); // use o método apropriado para obter as informações do usuário
    if(this.user && this.user.role && this.user.role == "sindico"){
      this.myGroup.get("building_id")?.disable();
      this.myGroup.patchValue({
        building_id:this.user.building_id
      });
      let event ={
        target:{
          value:this.user.building_id
        }
      }
      this.onBuildingSelect(event)
    }
  }
  

  formatUsageHistory() {
    this.usageHistory.map(history => {
      this.valorTotal += Number(history.total_cost);
      const formattedHistory = {
        id: history.id,
        start_time: history.start_time
          ? new Date(history.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : "--",
        end_time: history.end_time
          ? new Date(history.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : "--",
        userName: history.apt_name,
        machineName: history.machine_name,
        date: history.end_time
          ? new Date(history.end_time)
          : null,
        total_cost: history.total_cost
          ? parseFloat(history.total_cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          : "--"
      };
      this.formattedUsageHistory.push(formattedHistory);
    });
  
    this.formattedUsageHistory.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (!dateA) return 1; // Lidar com valores nulos
      if (!dateB) return -1;
      return dateB.getTime() - dateA.getTime();
    });
  
    // Formate as datas após a ordenação
    this.formattedUsageHistory.forEach(history => {
      if (history.date) {
        history.date = history.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
    });
  }
  
  
  



  mudarEstadoMaquina(machine:Machine):void{
    this.gerenciadorMaquinasService.verificacaoMaquinasAdmin(machine.id.toString());
  }

  getUserUsingMachine(machineId: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.usageHistoryService.getMachineUsageHistory(machineId).subscribe(
        (usageHistory: UsageHistory[]) => {
          const lastUsage = usageHistory[usageHistory.length - 1];
          if (lastUsage) {
            resolve(lastUsage.user_id);
          } else {
            resolve(null);
          }
        },
        (error: any) => {
          console.log('Error retrieving machine usage history:', error);
          reject(null);
        }
      );
    });
  }



  deleteUsageHistory(id: number) {
    const isConfirmed = window.confirm('Você tem certeza de que deseja EXCLUIR este histórico de uso?');
    if (isConfirmed) {
      this.transactionsService.getTransactionByUsageHistoryId(id).subscribe(
        (transaction: Transaction) => {
          if (transaction && transaction.id) {
            // Excluir a transação
            this.transactionsService.deleteTransactionById(transaction.id).subscribe(
              () => {  
                // Excluir o histórico de uso
                this.usageHistoryService.deleteUsageHistoryById(id).subscribe(
                  () => {  
                    // Remova o item excluído do array formattedUsageHistory
                    this.formattedUsageHistory = this.formattedUsageHistory.filter(item => item.id !== id);
                    if (this.selectedUser && this.selectedUser.valorTotal) {
                      this.selectedUser.valorTotal = this.selectedUser.valorTotal - Number(transaction.amount);
                      this.valorTotal = this.valorTotal - Number(transaction.amount);
                    }
                  },
                  (deleteError: any) => {
                    console.log('Error deleting usage history:', deleteError);
                  }
                );
              },
              (deleteError: any) => {
                console.log('Error deleting transaction:', deleteError);
              }
            );
          }
        },
        (error: any) => {
          console.log('Error retrieving transaction by usage history:', error);
        }
      );
    }
  }
  
  downloadTableData(){
    const formattedExcelArray = this.usageHistory.map(history => {
      const user = this.users.find(user => user.id === history.user_id);
      const userApt = user ? user.apt_name : "--";
      const userName = user ? user.first_name: "--";
      const userCPF = user ? user.cpf: "--";

      return {
        userApt: history.apt_name,
        userName: userName,
        userCPF: userCPF,
        machine:history.machine_name,
        start_time: history.start_time 
          ? new Date(history.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          : "--",
        end_time: history.end_time 
          ? new Date(history.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
          : "--",
        date: history.end_time 
          ? new Date(history.end_time).toLocaleDateString() 
          : "--",
        total_cost: history.total_cost 
          ? history.total_cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
          : "--"
      };
    });
  
    formattedExcelArray.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  
    this.excelService.exportToExcel(formattedExcelArray, "Teste");
  }
  
  onBuildingSelect(event: any): void {
    this.buildingId = event.target.value;
    this.updatePage();
  }

  onMonthSelect(event: any) {
    this.selectedMonth = event.target.value;
    this.consultaBDMonth = this.selectedYear + "-"+ this.selectedMonth
    this.updatePage();

  }
  onYearSelect(event: any) {
    this.selectedYear = event.target.value;
    this.consultaBDMonth = this.selectedYear + "-"+ this.selectedMonth
    this.updatePage();
  }

  updateUsageHistory(){
    this.formattedUsageHistory = [];
    this.usageHistory = [];
    this.valorTotal=0;
    if(this.buildingId != 0){
      this.usageHistoryService.getAllUsageHistoryByBuildingAndMonth(this.buildingId,this.consultaBDMonth)
      .subscribe({
        next: history => {
          this.usageHistory = history;
          this.formatUsageHistory();
        },
        error: error => {
          console.log('Error getting user usage history:', error);
        }
      });
    }
  }

  updatePage(){
    this.usageHistory = [];
    this.formattedUsageHistory = [];
    this.valorTotal = 0;
    if(this.buildingId && this.consultaBDMonth.length == 7) {
      this.updateUsageHistory();

      this.machineService.getMachinesByBuilding(this.buildingId).subscribe(
        async (machines) => {
          this.machines = machines;

          for (const machine of this.machines) {
            const userId = await this.getUserUsingMachine(machine.id);
            const user = userId !== null ? await this.userService.getUser(userId).toPromise() : null;
            machine.apt_in_use = user ? user.apt_name : '';


            this.nodeMcuService.checkNodemcuStatus(machine.idNodemcu).subscribe(
              (resp: any) => {
                machine.isConnected = resp.success;
              },
              (error) => {
                console.error('Error fetching buildings:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching machines:', error);
        }
      );

    } else {
      // Limpar a lista de usuários quando nenhum prédio for selecionado
      this.users = [];
    }
  }

  getMonthName(selectedMonthId: string): string {
    const selectedMonthObject = this.months.find(month => month.id === selectedMonthId);
    return selectedMonthObject ? selectedMonthObject.name : 'Mês não encontrado';
  }
}
