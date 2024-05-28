import { Routes } from '@angular/router';
import isLoggedGuardFn from '@app/guard/auth.guard.fn';
import LoginComponent from '@pages/login/login.component';
import RegisterComponent from '@pages/register/register.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component'),
    canActivate: [isLoggedGuardFn],
  },
];
