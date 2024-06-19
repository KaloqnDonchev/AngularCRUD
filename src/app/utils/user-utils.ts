import { User } from '../models/user.model';

export function validateUser(user: User): boolean {
    const namePattern = /^[A-Za-z\s]+$/;

    if (user.firstName.trim() === '' ||
        user.lastName.trim() === '' ||
        user.profession.trim() === '' ||
        user.gender === '' ||
        user.dateOfBirth === null) {
        return false;
    };

    if (!namePattern.test(user.firstName) || !namePattern.test(user.lastName)) {
        return false;
    };

    // Validate date of birth format and if it is a past date
    const today = new Date();
    const dateOfBirth = new Date(user.dateOfBirth);
    if (isNaN(dateOfBirth.getTime()) || dateOfBirth >= today) {
        return false;
    };

    return true;
}