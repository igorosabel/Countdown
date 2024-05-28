import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { CountdownsResult } from '@app/interfaces/countdown.interfaces';
import { StatusResult } from '@app/interfaces/interfaces';
import Countdown from '@app/model/countdown.model';
import { AddModalComponent } from '@app/modules/shared/modals/add-modal/add-modal.component';
import DialogService from '@app/services/dialog.service';
import { Modal } from '@interfaces/modals.interfaces';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import OverlayService from '@services/overlay.service';
import SidenavComponent from '@shared/components/sidenav/sidenav.component';

@Component({
  selector: 'cd-home',
  standalone: true,
  imports: [
    SidenavComponent,
    MatToolbar,
    MatToolbarRow,
    MatIconButton,
    MatIcon,
    MatFabButton,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private os: OverlayService = inject(OverlayService);
  private dialog: DialogService = inject(DialogService);

  list: WritableSignal<Countdown[]> = signal<Countdown[]>([]);
  timer: number = -1;
  currentTime: number = 0;
  edit: WritableSignal<boolean> = signal<boolean>(false);

  sidenav: Signal<SidenavComponent> =
    viewChild.required<SidenavComponent>('sidenav');

  ngOnInit(): void {
    this.currentTime = Date.now();
    this.getCountdowns();
  }

  getCountdowns(): void {
    this.as.getCountdowns().subscribe((result: CountdownsResult): void => {
      let timerOn: boolean = false;
      if (result.status === 'ok') {
        this.list.set(this.cms.getCountdowns(result.list));
        const toBeChecked: Countdown[] = this.list().filter(
          (x: Countdown): boolean => !x.finished
        );
        timerOn = toBeChecked.length > 0;
      }
      window.clearInterval(this.timer);
      if (timerOn) {
        window.setInterval((): void => {
          this.tick();
        }, 1000);
      }
    });
  }

  tick(): void {
    this.currentTime = Date.now();
    this.list.update((value: Countdown[]): Countdown[] => {
      for (let item of value) {
        item.check = this.currentTime;
      }
      return value;
    });
  }

  toggleSidenav(): void {
    this.sidenav().toggleSidenav();
  }

  showEdit(): void {
    this.edit.update((value: boolean): boolean => !value);
  }

  add(): void {
    const modalData: Modal = {
      modalTitle: `Nueva cuenta atrás`,
      modalColor: 'main',
    };
    const ref = this.os.open(AddModalComponent, modalData);
    ref.afterClosed$.subscribe((result): void => {
      if (result.data) {
        this.getCountdowns();
      }
    });
  }

  deleteCountdown(c: Countdown): void {
    console.log(c);
    this.dialog
      .confirm({
        title: 'Confirmar',
        content: '¿Estás seguro de querer borrar esta cuenta atrás?',
      })
      .subscribe((result: boolean): void => {
        if (result === true) {
          this.confirmDeleteCountdown(c);
        }
      });
  }

  confirmDeleteCountdown(c: Countdown): void {
    if (c.id !== null) {
      this.as.deleteCountdown(c.id).subscribe((result: StatusResult): void => {
        if (result.status === 'ok') {
          this.getCountdowns();
        } else {
          this.dialog.alert({
            title: 'Error',
            content: 'Ocurrió un error al borrar la cuenta atrás.',
          });
        }
      });
    }
  }
}
