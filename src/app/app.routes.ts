import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user/:id', component: EditUserComponent }
];