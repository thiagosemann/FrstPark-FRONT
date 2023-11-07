import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication';
import { User } from 'src/app/shared/utilitarios/user';
import { UserService } from 'src/app/shared/service/user_service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  editMode: boolean = false;
  password: string = "";
  confirmPassword: string = "";

  // Objeto com mensagens personalizadas para campos inválidos
  errorMessages: { [key: string]: string } = {
    first_name: 'Insira o primeiro nome',
    last_name: 'Insira o sobrenome',
    cpfInput: 'Insira o CPF',
    telefone: 'Insira o telefone',
    password: 'Insira uma senha',
    confirmPassword: 'Confirme a senha',
  };

  constructor(private authService: AuthenticationService, private userService: UserService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser()!;
  }

  enableEdit(): void {
    this.editMode = true;
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  saveProfile(profileForm: NgForm): void {
    // Verificar se o formulário é válido antes de salvar
    if (profileForm.invalid) {
      // Marcar todos os campos como tocados para exibir os erros
      profileForm.form.markAllAsTouched();

      // Verificar quais campos estão inválidos
      const invalidControls = Object.keys(profileForm.controls)
        .filter(key => profileForm.controls[key].invalid);

      // Obter a mensagem apropriada para o campo inválido
      const errorMessage = this.errorMessages[invalidControls[0].toString()];

      // Exibir a notificação com o toastr informando qual campo faltou preencher
      this.toaster.error(errorMessage);

      return;
    }

    // Verificar se as senhas são iguais
    if (this.password !== this.confirmPassword) {
      // Se as senhas não forem iguais, exibir a notificação com o toastr
      this.toaster.error("As senhas não coincidem.");
      return;
    }

    // Verificar se as senhas estão vazias
    if (this.password === "" || this.confirmPassword === "") {
      // Se as senhas estiverem vazias, exibir a notificação com o toastr
      this.toaster.error("As senhas não podem estar vazias.");
      return;
    }
    const date = new Date()
    this.user.create_time = date.getDate().toString();
    this.user.password = this.password;

    // Se o formulário for válido e as senhas forem iguais e não vazias, prossiga com o salvamento
    this.userService.updateUser(this.user).subscribe(
      (response) => {
        this.editMode = false;
        this.toaster.success("Cadastro atualizado com sucesso!");
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.toaster.error("Erro ao atualizar cadastro, por favor entre em contato com a FRST!");
      }
    );
  }
}
