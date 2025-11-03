import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
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
