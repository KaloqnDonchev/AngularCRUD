import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BACKEND_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  userChanged: EventEmitter<{ user: User, message: string }> = new EventEmitter<{ user: User, message: string }>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(BACKEND_ENDPOINT).pipe(
      map(users => {
        this.users = users;
        return users;
      }),
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.http.get<User[]>(BACKEND_ENDPOINT).pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  addUser(user: Partial<User>): Observable<User> {
    delete user.id;
    return this.http.post<User>(BACKEND_ENDPOINT, user).pipe(
      map(newUser => {
        this.users.push(newUser);
        this.userChanged.emit({ user: newUser, message: 'User added successfully!' });
        return newUser;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<void> {
    return this.http.patch<void>(`${BACKEND_ENDPOINT}/${user.id}`, user).pipe(
      map(() => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index > -1) {
          this.users[index] = user;
          this.userChanged.emit({ user: user, message: 'User updated successfully!' });
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${BACKEND_ENDPOINT}/${id}`).pipe(
      map(() => {
        this.users = this.users.filter(user => user.id !== id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
