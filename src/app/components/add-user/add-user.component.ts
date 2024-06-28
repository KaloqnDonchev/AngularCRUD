import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserUtils } from '../../utils/user-utils';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddUserComponent {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    profession: '', 
    gender: '',
    dateOfBirth: new Date('')
  };
  genders: string[] = ['Male', 'Female', 'Other'];
  selectedGenderLabel: string = 'Please select';
  wrongInformation: string | null = null;

  constructor(private userService: UserService, public router: Router) {};

  addUser(): void {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      this.userService.addUser(this.user);
      this.router.navigate(['/']);
    } else {
      this.wrongInformation = validationMessage;
    }
  }

  handleFileSelected(event: any): void {
    UserUtils.onFileSelected(event, this.user);
  }

  selectGender(gender: string): void {
    this.user.gender = gender;
    this.selectedGenderLabel = gender;
  }
}