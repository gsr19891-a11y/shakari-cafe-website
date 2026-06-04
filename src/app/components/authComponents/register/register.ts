import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  public userToken = signal<any>('')

  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}
  
  registerForm!: FormGroup


ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ]
    });
  }

  //რეგისტრაციის დადასტურება
  onSubmit(){
    if (this.registerForm.valid) {
      
      const email = this.registerForm.value.email;
      this.authService.register(this.registerForm.value).subscribe({
        next: (data: any) => {
          this.userToken.set(data.data.token);
          localStorage.setItem('token', data.data.token);
          console.log(this.userToken());
          
          //ვერიფიკაციის გვერდის გახსნა
          this.router.navigate(['/auth/verify',email]);
          
        },
        error: (error) => {
          console.log(error);
        }
        
      })



    }
  }








  
}
