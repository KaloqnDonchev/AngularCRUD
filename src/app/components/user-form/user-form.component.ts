import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserUtils } from '../../utils/user-utils';
import { FormValidationDirective } from '../../directives/form-validation.directive';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, FormValidationDirective],
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    profession: '',
    gender: '',
    dateOfBirth: new Date(''),
  };
  genders: string[] = ['Male', 'Female', 'Other'];
  selectedGenderLabel: string = 'Please select';
  wrongInformation: string | null = null;
  isEditMode: boolean = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService.getUserById(userId).subscribe((user) => {
        if (user) {
          this.user = user;
          this.selectedGenderLabel = user.gender;
        }
      });
    }
  }

  addUser(): void {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      this.userService.addUser(this.user).subscribe({
        next: () => this.router.navigate(['/']),
        error: () =>
          (this.wrongInformation = 'An error occurred while adding the user.'),
      });
    } else {
      this.wrongInformation = validationMessage;
    }
  }

  updateUser(): void {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      this.userService.updateUser(this.user).subscribe({
        next: () => this.router.navigate(['/']),
        error: () =>
          (this.wrongInformation =
            'An error occurred while updating the user.'),
      });
    } else {
      this.wrongInformation = validationMessage;
    }
  }

  handleFileSelected(event: any): void {
    UserUtils.onFileSelected(event, this.user);
  }

  handleSubmit(event: any): void {
    if (!event?.target.checkValidity()) {
      event.preventDefault();
    } else if (this.isEditMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  selectGender(gender: string): void {
    this.user.gender = gender;
    this.selectedGenderLabel = gender;
  }
}
