import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BACKEND_ENDPOINT } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  async getUsers(): Promise<User[]> {
    await fetch(BACKEND_ENDPOINT)
    .then(response => response.json())
    .then(users => this.users = users);
    return this.users;
  };

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  };

  async addUser(user: Partial<User>): Promise<void> {
    delete user.id;
    await fetch(BACKEND_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(newUser => this.users.push(newUser))
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
  };

  async updateUser(user: User): Promise<void> {
    await fetch(`${BACKEND_ENDPOINT}/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(() => {
      const index = this.users.findIndex(u => u.id === user.id);  // if no element matches findIndex it returns "-1"
      if (index > -1) {
        this.users[index] = user;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
  };

  async deleteUser(id: string): Promise<void> {
    await fetch(`${BACKEND_ENDPOINT}/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      this.users = this.users.filter(user => user.id !== id);
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
  };
};