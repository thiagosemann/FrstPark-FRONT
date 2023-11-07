import { Component, OnInit, NgZone,Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication';
import { BuildingService } from 'src/app/shared/service/buildings_service';
import { UserService } from 'src/app/shared/service/user_service';
import { Building } from 'src/app/shared/utilitarios/buildings';
import { User } from 'src/app/shared/utilitarios/user';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Machine } from 'src/app/shared/utilitarios/machines';
import { ToastrService } from 'ngx-toastr';

export const ConfirmValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: boolean} | null => {
    const input = control.get(controlName);
    const matchingInput = control.get(matchingControlName);

    return (input && matchingInput && input.value !== matchingInput.value) ? {'mismatch': true} : null;
  };
};

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {
  buildings: Building[] = [];
  users: User[] = [];
  myGroup: FormGroup; // Add a FormGroup property
  machines: Machine[] = [];
  isEditing: boolean = false;
  user: any = null; // Use o tipo de dado adequado para o usuário
  showEditComponent:boolean = false;
  registerForm!: FormGroup;
  userID: string = '';
  userEditing : User | undefined;
  errorMessages: { [key: string]: string } = {
    first_name: 'Insira o primeiro nome',
    last_name: 'Insira o sobrenome',
    cpf: 'Insira o CPF',
    telefone: 'Insira o telefone',
    data_nasc: 'Insira a data de nascimento',
    apt_name: 'Insira o nome apartamento',
    emailGroup: 'Verifique os e-mails digitados',
    passwordGroup: 'Verifique as senhas digitadas'
  };

  constructor(
    private buildingService: BuildingService,
    private userService: UserService,
    private authService: AuthenticationService,
    private ngZone: NgZone, // Adicione o NgZone
    private formBuilder: FormBuilder,
    private toastr: ToastrService,

  ) {
    this.myGroup = new FormGroup({
      building_id: new FormControl(''), // Create a form control for 'building_id'
    });
  }

  ngOnInit(): void {
    this.manageSindico();
    this.getAllBuildings();

    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      data_nasc: ['', Validators.required],
      telefone: ['', Validators.required],
      apt_name: ['', Validators.required],
      credito: [10],
      role: [''] // Defina o campo 'role' no FormGroup
    });
  }

  getAllBuildings():void{
    this.buildingService.getAllBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings; // Set the value inside the subscription
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
  onBuildingSelect(event: any): void {
    const buildingId = event.target.value;
    if (buildingId) {
      this.userService.getUsersByBuilding(parseInt(buildingId, 10)).subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (error) => {
          console.error('Error fetching users by building:', error);
        }
      );
    } else {
      this.users = [];
    }
  }
  editUser(userAux: User): void {
    this.userEditing = userAux;
    const formattedBirthDate = this.userEditing.data_nasc ? this.formatDate(this.userEditing.data_nasc.toString()) : '';
    this.registerForm.patchValue({
      first_name: this.userEditing.first_name,
      last_name: this.userEditing.last_name,
      cpf: this.userEditing.cpf,
      data_nasc: formattedBirthDate,
      telefone: this.userEditing.telefone,
      apt_name: this.userEditing.apt_name,
      email: this.userEditing.email,
      role: this.userEditing.role // Preencha o campo 'role' com o valor do usuário
    });
    this.showEditComponent = !this.showEditComponent;

  }
  cancelarEdit(): void {
    this.showEditComponent = !this.showEditComponent;
  }

  deleteUser(user: User): void {
    const isConfirmed = window.confirm(`Você tem certeza de que deseja EXCLUIR o usuário ${user.first_name} ${user.last_name}?`);
    if (isConfirmed) {
      this.ngZone.run(() => {
        this.userService.deleteUser(user.id).subscribe(
         () => {
            this.users = this.users.filter((u) => u.id !== user.id);
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );  
      });
    }
  }
  
    resetPassword(user: User): void {
      const isConfirmed = window.confirm(`Você tem certeza de que deseja redefinir a senha do usuário ${user.first_name} ${user.last_name}?`);
      if (isConfirmed) {
        user.password = "12345678";
        this.userService.updateUser(user).subscribe(
          (response) => {
            this.toastr.success(response.message);
          },
          (error) => {
            console.error('Erro ao atualizar o usuário:', error);
            // Lógica para lidar com erros (por exemplo, exibir uma mensagem de erro)
            this.toastr.error('Erro ao atualizar o usuário');
          }
        );
      }
    }
    onSubmit(): void {
      if (this.registerForm.valid) {
        if (this.userEditing) {

          const { id } = this.userEditing;
          const updatedUser = { id, ...this.registerForm.value};
         
         this.userService.updateUser(updatedUser).subscribe(
            (response) => {
              // Lógica após a atualização bem-sucedida (por exemplo, exibir uma mensagem de sucesso)
              let event ={
                target:{
                  value:this.userEditing!.building_id
                }
              }
              this.onBuildingSelect(event)
              this.toastr.success(response.message);
              this.showEditComponent = false; // Feche o componente de edição após a atualização
            },
            (error) => {
              console.error('Erro ao atualizar o usuário:', error);
              // Lógica para lidar com erros (por exemplo, exibir uma mensagem de erro)
              this.toastr.error('Erro ao atualizar o usuário');
            }
          );
          
        } 
        
      } else {
        for (const controlName in this.registerForm.controls) {
          const control = this.registerForm.get(controlName);
          if (control && control.invalid) {
            this.toastr.error(this.errorMessages[controlName]);
          }
        }
      }
    }
    
    formatDate(dateString: string | undefined): string {
      if (dateString) {
        const dateParts = dateString.split('T')[0].split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        return `${year}-${month}-${day}`;
      }
      return '';
    }
}