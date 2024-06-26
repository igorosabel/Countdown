import { Provider } from '@angular/core';
import ApiService from '@services/api.service';
import AuthService from '@services/auth.service';
import ClassMapperService from '@services/class-mapper.service';
import DialogService from '@services/dialog.service';
import OverlayService from '@services/overlay.service';
import UserService from '@services/user.service';

export default function provideCore(): Provider[] {
  return [
    ApiService,
    UserService,
    ClassMapperService,
    AuthService,
    DialogService,
    OverlayService,
  ];
}
