import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(private userService: UserService) {};

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.setPage(this.currentPage);
  };

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  };

  async deleteUser(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this user?')) {
      await this.userService.deleteUser(id);
      this.users = await this.userService.getUsers();
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);   // generates an array of page numbers for iterating in pagination
      if (this.currentPage > this.totalPages) {   // e.g. deleting the last user on the last page
        this.currentPage = this.totalPages;
      }
      this.setPage(this.currentPage);
    };
  };

  calculateAge(dateOfBirth: Date): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
};