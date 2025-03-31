import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { UserService } from './core/services/user.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pages/users/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const userService = inject(UserService);
      // Fetch the IDs that you want to prerender
      const userIds = await userService.getIds();

      // Transform the array of IDs into the format expected by Angular
      return userIds.map(id => ({ id }));
    },
  },
];
