import { Component, OnInit } from '@angular/core';
import { GerenciadorMaquinasService } from 'src/app/shared/service/gerenciadorMaquinas';
import { MachineService } from 'src/app/shared/service/machines_service';
import { NodemcuService } from 'src/app/shared/service/nodemcu_service';
import { UsageHistoryService } from 'src/app/shared/service/usageHistory_service';
import { UserService } from 'src/app/shared/service/user_service';
import { Machine } from 'src/app/shared/utilitarios/machines';
import { UsageHistory } from 'src/app/shared/utilitarios/usageHistory';

@Component({
  selector: 'app-machines-control',
  templateUrl: './machines-control.component.html',
  styleUrls: ['./machines-control.component.css']
})
export class MachinesControlComponent implements OnInit {
  buildingsData: any[] = [];

  constructor(
    private gerenciadorMaquinasService: GerenciadorMaquinasService,
    private machineService: MachineService,
    private usageHistoryService: UsageHistoryService,
    private userService: UserService,
    private nodeMcuService: NodemcuService,

    ) { }


  ngOnInit(): void {
    // Suponha que você tenha dados de prédios em algum lugar, substitua isso com seus dados reais.
    const buildingIds = [1, 3, 4]; // Exemplo: três prédios com IDs 1, 2 e 3.
    // Itere pelos IDs dos prédios e obtenha as máquinas de cada prédio.
    for (const buildingId of buildingIds) {
      this.machineService.getMachinesByBuilding(buildingId).subscribe(
        async (machines) => {
          let buildingData = {
            buildingId: buildingId,
            machines: machines,
            buildingName:""
          };

          for (const machine of machines) {
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
          if(buildingId==1){
            buildingData.buildingName = "Capri";
          }else if(buildingId==3){
            buildingData.buildingName = "Bergamo";
          }else if(buildingId==4){
            buildingData.buildingName = "Rodes";
          }
          // Adicione dados do prédio à matriz de dados de prédios.
          this.buildingsData.push(buildingData);

        },
        (error) => {
          console.error('Error fetching machines for building:', error);
        }
      );
    }

    
    this.machineService.getMachinesByBuilding(1).subscribe(
      async (machines) => {

      },
      (error) => {
        console.error('Error fetching machines:', error);
      }
    );
  }

  mudarEstadoMaquina(machine:Machine):void{
    this.gerenciadorMaquinasService.verificacaoMaquinas(machine.id.toString());
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


}
