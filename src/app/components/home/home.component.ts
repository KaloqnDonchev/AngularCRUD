import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalizeFirstLetter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CapitalizeFirstLetterPipe],
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  pages: number[] = [];
  userIdToDelete: string | null = null;
  successMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.successMessage = this.userService.getSuccessMessage();
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
      this.setPage(this.currentPage);
    });
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const startIndex = (page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedUsers = this.users.slice(startIndex, endIndex);
    }
  }

  openDeleteModal(userId: string): void {
    this.userIdToDelete = userId;
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.removeAttribute('aria-hidden');
      modalElement.setAttribute('aria-modal', 'true');
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.removeAttribute('aria-modal');
    }
  }

  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(() => {
        this.refreshUsers();
        this.closeModal();
        this.successMessage = 'User deleted successfully!';
      });
    }
  }

  calculateAge(dateOfBirth: Date): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
