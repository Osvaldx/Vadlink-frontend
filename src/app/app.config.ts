import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideIcons } from '@ng-icons/core';
import {
  heroUserSolid,
  heroEyeSolid,
  heroEyeSlashSolid,
  heroKeySolid,
  heroTagSolid,
  heroIdentificationSolid,
  heroCalendarDateRangeSolid,
  heroUsersSolid,
  heroChatBubbleBottomCenterTextSolid,
  heroCloudArrowUpSolid,
  heroTrashSolid,
 } from '@ng-icons/heroicons/solid';
import { 
  faSolidCube,
  faSolidUserGear,
  faSolidImages,
  faSolidCircleRight,
  faSolidCircleXmark,
  faSolidCircleExclamation,
  faSolidCircleCheck,
  faSolidC,
  faSolidCircleNotch
 } from '@ng-icons/font-awesome/solid';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './interceptors/header-interceptor';
import { handledErrorsInterceptor } from './interceptors/handled-errors-interceptor';
import { Auth } from './services/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: Auth) => () => auth.loadCurrentUser(),
      deps: [Auth],
      multi: true,
    },
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideIcons({
      heroUserSolid,
      heroEyeSolid,
      heroEyeSlashSolid,
      heroKeySolid,
      heroTagSolid,
      heroIdentificationSolid,
      heroCalendarDateRangeSolid,
      heroUsersSolid,
      heroChatBubbleBottomCenterTextSolid,
      heroCloudArrowUpSolid,
      heroTrashSolid,
      faSolidCube,
      faSolidUserGear,
      faSolidImages,
      faSolidCircleRight,
      faSolidCircleXmark,
      faSolidCircleExclamation,
      faSolidCircleCheck,
      faSolidC,
      faSolidCircleNotch
    })
  ]
};
