import { Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AddEventComponent} from "./add-event/add-event.component";
import {NavbarComponent} from "./navbar/navbar.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'add-event', component: AddEventComponent },
  { path: 'edit-event/:id', component:AddEventComponent},
  {path : 'navbar' , component : NavbarComponent}
  ]

