/**
 * routes of all the pages
 */

import { Routes } from '@angular/router';
import { APP_PATHS } from '@app/app.paths';
import { PagesComponent } from '@app/layout/pages/pages.component';

export const PAGE_ROUTES: Routes = [
  {
    path: APP_PATHS.EPMTY,
    component: PagesComponent,
    children: [
      {
        path: APP_PATHS.EPMTY,
        redirectTo: APP_PATHS.USERS,
        pathMatch: 'full'
      },
      {
        path: APP_PATHS.USERS,
        loadComponent: () => import('./user-list.component/user-list.component.component').then(comp => comp.UserListComponentComponent),
      },
      {
        path: `${APP_PATHS.USERS}/:id`,
        loadComponent: () => import('./user-detail/user-detail.component').then(comp => comp.UserDetailComponent),
      },
      // {
      //   path: '**',
      //   redirectTo: APP_PATHS.USERS
      // }
    ],
  },
];
