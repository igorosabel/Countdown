import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import {
  LoginResult,
  RegisterData,
  RegisterValidation,
} from '@interfaces/user.interfaces';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import DialogService from '@services/dialog.service';
import UserService from '@services/user.service';

@Component({
  selector: 'cd-register',
  standalone: true,
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    FormsModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  as: ApiService = inject(ApiService);
  us: UserService = inject(UserService);
  cms: ClassMapperService = inject(ClassMapperService);
  ds: DialogService = inject(DialogService);
  router: Router = inject(Router);

  registerData: RegisterData = {
    username: null,
    pass: null,
    conf: null,
  };
  validation: RegisterValidation = {
    username: false,
    pass: false,
    conf: false,
    passMatch: false,
  };
  loading: WritableSignal<boolean> = signal<boolean>(false);

  resetValidation(): void {
    this.validation.username = false;
    this.validation.pass = false;
    this.validation.conf = false;
    this.validation.passMatch = false;
  }

  checkValidations(): boolean {
    return (
      !this.validation.username &&
      !this.validation.pass &&
      !this.validation.conf &&
      !this.validation.passMatch
    );
  }

  checkForm(): void {
    this.resetValidation();

    if (!this.registerData.username) {
      this.validation.username = true;
    }
    if (!this.registerData.pass) {
      this.validation.pass = true;
    }
    if (!this.registerData.conf) {
      this.validation.conf = true;
    }
    if (
      this.registerData.pass !== null &&
      this.registerData.conf !== null &&
      this.registerData.pass !== this.registerData.conf
    ) {
      this.validation.passMatch = true;
    }

    if (this.checkValidations()) {
      this.loading.set(true);
      this.as
        .register(this.registerData)
        .subscribe((result: LoginResult): void => {
          this.loading.set(false);
          if (result.status === 'ok') {
            this.us.logged = true;
            this.us.user = this.cms.getUser(result.user);
            this.us.saveLogin();
            this.router.navigate(['/home']);
          }
          if (result.status === 'error-username') {
            this.ds.alert({
              title: 'Error',
              content:
                'El usuario introducido ya está en uso. ¿Has olvidado tu usuario o contraseña?',
              ok: 'Continuar',
            });
          }
          if (result.status === 'error') {
            this.ds.alert({
              title: 'Error',
              content: 'Ocurrió un error al registrarte.',
              ok: 'Continuar',
            });
          }
        });
    }
  }
}
