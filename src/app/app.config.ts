import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import es from '@angular/common/locales/es';
import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import ResponseInterceptor from '@app/interceptors/response.interceptor';
import TokenInterceptor from '@app/interceptors/token.interceptor';
import provideCore from '@modules/core';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es',
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
    provideNativeDateAdapter(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([TokenInterceptor, ResponseInterceptor])
    ),
    provideAnimationsAsync(),
    provideCore(),
    provideClientHydration(),
  ],
};
