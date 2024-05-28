import { Component, WritableSignal, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListModule,
  MatNavList,
} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import UserService from '@app/services/user.service';

@Component({
  selector: 'cd-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbar,
    MatToolbarRow,
    MatListModule,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatIcon,
    RouterLink,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export default class SidenavComponent {
  private user: UserService = inject(UserService);
  private router: Router = inject(Router);

  opened: WritableSignal<boolean> = signal<boolean>(false);

  toggleSidenav(): void {
    this.opened.update((value: boolean): boolean => !value);
  }

  logout(ev: MouseEvent): void {
    ev.preventDefault();
    this.user.logout();
    this.router.navigate(['/']);
  }
}
