import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '@app/core/models/user.model';
import { StateService } from '@app/core/services/state.service';
import { UserService } from '@app/core/services/user.service';
import { EditableTableComponent } from '@app/shared/components/editable-table/editable-table.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list.component',
  templateUrl: './user-list.component.component.html',
  styleUrl: './user-list.component.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EditableTableComponent]
})
export class UserListComponentComponent implements OnInit {
  users$: Observable<User[]>;
  columns$: Observable<string[]>;
  loading = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private stateService: StateService
  ) {
    this.users$ = this.stateService.users$!;
    this.columns$ = this.stateService.columns$!;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.fetchUsers().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load users. Please try again later.';
        console.error('Error loading users:', err);
      }
    });
  }

  handleRowEdit(updatedUser: User): void {
    this.stateService.updateUser(updatedUser);
  }
}