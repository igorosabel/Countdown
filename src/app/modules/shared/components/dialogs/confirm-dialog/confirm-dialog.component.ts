import { Component, WritableSignal, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
})
export default class ConfirmDialogComponent {
  public title: WritableSignal<string> = signal<string>('');
  public content: WritableSignal<string> = signal<string>('');
  public ok: WritableSignal<string> = signal<string>('Continuar');
  public cancel: WritableSignal<string> = signal<string>('Cancelar');

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {}
}
