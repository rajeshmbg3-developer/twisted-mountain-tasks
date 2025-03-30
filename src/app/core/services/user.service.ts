import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';

    constructor(
        private http: HttpClient,
        private stateService: StateService
    ) { }

    // Fetches all users and updates the state
    fetchUsers(): Observable<User[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => {
                // Handle the JSON structure - assuming the data is in an array format
                // Adjust this based on the actual structure of the JSON file
                const users = Array.isArray(response) ? response : [];

                // Add unique IDs if not present
                return users.map((user: any, index: number) => ({
                    id: user.id || index + 1,
                    ...user
                }));
            }),
            tap(users => {
                this.stateService.setUsers(users);
            })
        );
    }

    // Gets user by ID
    getUserById(id: string): Observable<User | undefined> {
        return this.stateService.users$.pipe(
            map(users => users.find(user => user.id === id))
        );
    }
}