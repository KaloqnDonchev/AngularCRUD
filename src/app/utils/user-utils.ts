import { User } from '../models/user.model';

export class UserUtils {
  static validateUser(user: User): string {
    const namePattern = /^[a-zA-Zа-яА-ЯёЁ]+$/;

    if (
      user.firstName.trim() === '' ||
      user.lastName.trim() === '' ||
      user.profession.trim() === '' ||
      user.gender === '' ||
      user.dateOfBirth === null
    ) {
      return "Please fill all the fields";
    }

    if (!namePattern.test(user.firstName) || !namePattern.test(user.lastName)) {
      return "Please enter a valid name";
    }

    // Validate date of birth format and if it is a past date
    const today = new Date();
    const dateOfBirth = new Date(user.dateOfBirth);
    if (isNaN(dateOfBirth.getTime()) || dateOfBirth >= today) {
      return "Please enter a valid date of birth";
    }

    return "valid";
  }

  static onFileSelected(event: any, user: any): void {
    if (event.target.files) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        user.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
