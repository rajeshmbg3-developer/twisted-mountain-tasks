import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    // Main data store
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    // Selected user for detail view
    private selectedUserSubject = new BehaviorSubject<User | null>(null);
    selectedUser$ = this.selectedUserSubject.asObservable();

    // Table columns
    private columnsSubject = new BehaviorSubject<string[]>([]);
    columns$ = this.columnsSubject.asObservable();

    constructor() { }

    // Updates the users array
    setUsers(users: User[]): void {
        this.usersSubject.next(users);

        // Extract column names from the first user object
        if (users.length > 0) {
            const columns = Object.keys(users[0]);
            this.columnsSubject.next(columns);
        }
    }

    // Updates the selected user
    setSelectedUser(user: User | null): void {
        this.selectedUserSubject.next(user);
    }

    // Updates a specific user in the array (for inline editing)
    updateUser(updatedUser: User): void {
        const currentUsers = this.usersSubject.getValue();
        const updatedUsers = currentUsers.map(user =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
        this.usersSubject.next(updatedUsers);

        // Also update selected user if it's the one being edited
        const selectedUser = this.selectedUserSubject.getValue();
        if (selectedUser && selectedUser.id === updatedUser.id) {
            this.selectedUserSubject.next({ ...selectedUser, ...updatedUser });
        }
    }
}