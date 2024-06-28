import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserUtils } from '../../utils/user-utils';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditUserComponent implements OnInit {
  user: User = {
    id: "",
    firstName: '',
    lastName: '',
    profession: '',
    gender: '',
    dateOfBirth: new Date()
  };
  genders: string[] = ['Male', 'Female', 'Other'];
  selectedGenderLabel: string = 'Please select';
  wrongInformation: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const foundUser = this.userService.getUserById(id);
    if (foundUser) {
      this.user = foundUser;
      this.selectedGenderLabel = this.user.gender;
    } else {
      this.router.navigate(['/']);
    }
  }

  updateUser(): void {
    const validationMessage = UserUtils.validateUser(this.user);
    if (validationMessage === 'valid') {
      this.userService.updateUser(this.user);
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