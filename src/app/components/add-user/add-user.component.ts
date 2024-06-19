import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddUserComponent {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    profession: '',
    gender: '',
    dateOfBirth: new Date()
  };

  constructor(private userService: UserService, public router: Router) {}

  addUser(): void {
    if (this.validateUser(this.user)) {
      this.userService.addUser(this.user);
      alert('User added successfully!');
      this.router.navigate(['/']);
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  validateUser(user: User): boolean {
    const namePattern = /^[A-Za-z\s]+$/;
    return user.firstName.trim() !== '' &&
           user.lastName.trim() !== '' &&
           user.profession.trim() !== '' &&
           user.gender !== '' &&
           user.dateOfBirth !== null &&
           namePattern.test(user.firstName) &&
           namePattern.test(user.lastName);
  }
}