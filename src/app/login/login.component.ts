import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage : string = "";

  constructor(private fb: FormBuilder, private router: Router , private authService : AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      const dataLogin = this.loginForm.value;
      this.authService.login(dataLogin).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);

          //rediriger l'utilisateur selon leur role
          if(response.role === 'Admin'){
            alert("welcome admin")
            // this.router.navigate(['/admin-dashboard']);
          }else {
            alert("welcome client")
            // this.router.navigate(['user-dashboard']);
          }
        },
        error: (err)=>{
          this.errorMessage = typeof err === 'string' ? err : 'Login failed';
        }
      })
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }


}
