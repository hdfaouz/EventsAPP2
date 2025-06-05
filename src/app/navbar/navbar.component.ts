import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbarRow,
    MatToolbar
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor( private router : Router) {
  }
  navigateToEvents() {
    this.router.navigate(['/events']);
  }

  navigateToReservations() {
    this.router.navigate(['/reservations']);
  }

  logout() {
    // Logique de déconnexion
    localStorage.removeItem('token'); // Exemple
    this.router.navigate(['/login']);
  }

}
