import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserUtils } from '../../utils/user-utils';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserFormComponent implements OnInit {
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
  isEditMode: boolean = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {           // check whether it needs else with nagivation
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      const user = this.userService.getUserById(userId);
      if (user) {
        this.user = user;
        this.selectedGenderLabel = user.gender;
      }
    }
  }

  async addUser(): Promise<void> {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      await this.userService.addUser(this.user).catch(error => {
        this.wrongInformation = 'An error occurred while adding the user.';
      });
      this.router.navigate(['/']);
    } else {
      this.wrongInformation = validationMessage;
    }
  }

  async updateUser(): Promise<void> {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      await this.userService.updateUser(this.user).catch(error => {
        this.wrongInformation = 'An error occurred while updating the user.';
      });
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
