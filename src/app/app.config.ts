import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
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
  heroTrashSolid
 } from '@ng-icons/heroicons/solid';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './interceptors/header-interceptor';
import { handledErrorsInterceptor } from './interceptors/handled-errors-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, handledErrorsInterceptor])),
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
      heroTrashSolid
    })
  ]
};
