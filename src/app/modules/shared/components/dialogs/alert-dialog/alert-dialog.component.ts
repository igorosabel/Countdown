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
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
})
export default class AlertDialogComponent {
  public title: WritableSignal<string> = signal<string>('');
  public content: WritableSignal<string> = signal<string>('');
  public ok: WritableSignal<string> = signal<string>('Continuar');

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {}
}
