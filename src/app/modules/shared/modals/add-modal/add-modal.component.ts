import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import DialogService from '@app/services/dialog.service';
import { CountdownValidation } from '@interfaces/countdown.interfaces';
import { StatusResult } from '@interfaces/interfaces';
import CustomOverlayRef from '@model/custom-overlay-ref.model';
import ApiService from '@services/api.service';

@Component({
  selector: 'cd-add-modal',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSuffix,
    FormsModule,
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  private customOverlayRef: CustomOverlayRef<null, {}> = inject(
    CustomOverlayRef<null, {}>
  );
  private as: ApiService = inject(ApiService);
  private dialog: DialogService = inject(DialogService);

  endDate: Date | null = null;
  hour: number | null = null;
  minutes: number | null = null;

  validation: CountdownValidation = {
    date: false,
    hour: false,
    hourInvalid: false,
    minutes: false,
    minutesInvalid: false,
  };

  loading: WritableSignal<boolean> = signal<boolean>(false);

  resetValidations(): void {
    this.validation.date = false;
    this.validation.hour = false;
    this.validation.hourInvalid = false;
    this.validation.minutes = false;
    this.validation.minutesInvalid = false;
  }

  checkValidations(): boolean {
    return (
      !this.validation.date &&
      !this.validation.hour &&
      !this.validation.hourInvalid &&
      !this.validation.minutes &&
      !this.validation.minutesInvalid
    );
  }

  save(): void {
    this.resetValidations();

    if (this.endDate === null) {
      this.validation.date = true;
    }

    if (this.hour === null) {
      this.validation.hour = true;
    } else if (this.hour < 0 || this.hour > 23) {
      this.validation.hourInvalid = true;
    }

    if (this.minutes === null) {
      this.validation.minutes = true;
    } else if (this.minutes < 0 || this.minutes > 59) {
      this.validation.minutesInvalid = true;
    }

    if (
      this.checkValidations() &&
      this.endDate !== null &&
      this.hour !== null &&
      this.minutes !== null
    ) {
      const finalDate: Date = new Date(this.endDate);
      finalDate.setHours(finalDate.getHours() + this.hour);
      finalDate.setMinutes(finalDate.getMinutes() + this.minutes);
      const ts: number = finalDate.getTime() / 1000;
      this.loading.set(true);
      this.as.saveCountdown(ts).subscribe((result: StatusResult): void => {
        this.loading.set(false);
        if (result.status === 'ok') {
          this.customOverlayRef.close(true);
        } else {
          this.dialog.alert({
            title: 'Error',
            content: 'Ocurrió un error al guardar la cuenta atrás.',
          });
        }
      });
    }
  }
}
