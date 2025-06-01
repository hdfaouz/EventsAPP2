import { Component } from '@angular/core';
import {AuthService, RegisterRequest} from "../Services/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage : string="";
  successMessage : string="";

  constructor(private fb : FormBuilder, private authService : AuthService , private router : Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ["CLIENT"]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const data : RegisterRequest = this.registerForm.value;
      this.authService.register(data).subscribe({
        next : response =>{
          this.successMessage = 'Registration successful';
          this.errorMessage = '';
          this.registerForm.reset();
          //pour rediriger après 1,5 second vers login
          setTimeout(()=> this.router.navigate(['/login']),1500);
        },
        error: err=>{
          this.errorMessage = err || 'Registration failed';
          this.successMessage='';
        }
      });

    }
  }


}
