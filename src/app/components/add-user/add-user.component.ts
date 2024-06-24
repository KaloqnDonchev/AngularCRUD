import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { validateUser } from '../../utils/user-utils';
import { onFileSelected } from '../../utils/user-utils';

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
  wrongInformation: boolean = false;

  constructor(private userService: UserService, public router: Router) {};

  addUser(): void {
    if (validateUser(this.user)) {
      this.userService.addUser(this.user);
      this.router.navigate(['/']);
    } else {
      this.wrongInformation = true;
    };
  };

  handleFileSelected(event: any): void {
    onFileSelected(event, this.user);
  };

  selectGender(gender: string): void {
    this.user.gender = gender;
    this.selectedGenderLabel = gender;
  };
};