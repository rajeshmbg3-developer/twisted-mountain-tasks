import { Routes } from '@angular/router';
import { APP_PATHS } from './app.paths';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: APP_PATHS.EPMTY,
    component: LayoutComponent,
    // canActivate: [],
    children: [
      {
        path: APP_PATHS.EPMTY,
        redirectTo: APP_PATHS.PAGES,
        pathMatch: 'full',
      },
      {
        path: APP_PATHS.PAGES,
        loadChildren: () =>
          import('./layout/pages/pages.routes').then((routes) => routes.PAGE_ROUTES),
      },
    ],
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./common/error-slate/error-slate.component').then((comp) => comp.ErrorSlateComponent),
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full',
  },
];
