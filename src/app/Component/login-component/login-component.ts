import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMsg = '';
     const { email, password } = this.loginForm.value;
     
     this.auth.login(email, password).subscribe({
      next : (user)=>{
        this.loading = false;
         // 🔑 Role-based redirect
         switch (user.role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Doctor':
            this.router.navigate(['/doctor']);
            break;
          case 'FrontDesk':
            this.router.navigate(['/frontdesk']);
            break;
          case 'Patient':
            this.router.navigate(['/patient']);
            break;
          default:
            this.router.navigate(['/']);
        }

      },
       error: (err) => {
        this.loading = false;
        console.error(err);
        this.errorMsg = 'Invalid email or password';
      }
     });
  }
}
