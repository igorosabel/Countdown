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
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { CountdownsResult } from '@app/interfaces/countdown.interfaces';
import Countdown from '@app/model/countdown.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
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
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent implements OnInit {
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);

  list: WritableSignal<Countdown[]> = signal<Countdown[]>([]);

  sidenav: Signal<SidenavComponent> =
    viewChild.required<SidenavComponent>('sidenav');

  ngOnInit(): void {
    this.as.getCountdowns().subscribe((result: CountdownsResult): void => {
      if (result.status === 'ok') {
        this.list.set(this.cms.getCountdowns(result.list));
      }
    });
  }

  toggleSidenav(): void {
    this.sidenav().toggleSidenav();
  }
}
