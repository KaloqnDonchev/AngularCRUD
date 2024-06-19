import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditUserComponent implements OnInit {
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    profession: '',
    gender: '',
    dateOfBirth: new Date()
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const foundUser = this.userService.getUserById(id);
    if (foundUser) {
      this.user = foundUser;
    } else {
      alert('User not found!');
      this.router.navigate(['/']);
    }
  }

  updateUser(): void {
    if (this.validateUser(this.user)) {
      this.userService.updateUser(this.user);
      alert('User updated successfully!');
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

  onFileSelected(event: any): void {
    if (event.target.files) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}