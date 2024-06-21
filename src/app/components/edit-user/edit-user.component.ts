import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { validateUser } from '../../utils/user-utils';

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
      alert('User not found!');
      this.router.navigate(['/']);
    }
  }

  updateUser(): void {
    if (validateUser(this.user)) {
      this.userService.updateUser(this.user);
      alert('User updated successfully!');
      this.router.navigate(['/']);
    } else {
      alert('Please fill in all fields correctly.');
    }
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

  selectGender(gender: string): void {
    this.user.gender = gender;
    this.selectedGenderLabel = gender;
  }
}