import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';
import { CalculateAgePipe } from '../../pipes/calculate-age.pipe';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalizeFirstLetter.pipe';

@Component({
  selector: '[app-user-table]',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CalculateAgePipe,
    CapitalizeFirstLetterPipe,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() user!: User;
  @Input() openDeleteModal!: (userId: string) => void;
}
