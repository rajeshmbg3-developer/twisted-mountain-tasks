import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_PATHS } from '@app/app.paths';
import { User } from '@app/core/models/user.model';
import { StateService } from '@app/core/services/state.service';
import { UserService } from '@app/core/services/user.service';
import { Observable, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | null>;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private stateService: StateService
  ) {
    this.user$ = this.stateService.selectedUser$;
  }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          return of(null);
        }
        return this.userService.getUserById(id);
      })
    ).subscribe({
      next: (user) => {
        this.loading = false;
        if (user) {
          this.stateService.setSelectedUser(user);
        } else {
          this.error = 'User not found';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load user details';
        console.error('Error loading user details:', err);
      }
    });
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  goBack(): void {
    this.router.navigate([`${APP_PATHS.PAGES}/${APP_PATHS.USERS}`]);
  }
}