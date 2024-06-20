import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    profession: 'Software Engineer',
    gender: 'Male',
    dateOfBirth: new Date(1990, 0, 1),
    image: 'https://www.theladders.com/wp-content/uploads/man_outside_091318.jpg'
  }];
  private nextId = 1;

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(user: User): void {
    user.id = this.nextId++;
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);  // if no element matches findIndex it returns "-1"
    if (index > -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}