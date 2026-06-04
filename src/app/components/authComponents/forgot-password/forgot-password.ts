import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  forgotForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
   private  authService: AuthService,
   private router: Router
  ){}


  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['']
    })
  }

  //პაროლის აღდგენა
  onSubmit() {
    if (this.forgotForm.valid) {
      const email = this.forgotForm.value.email;

      this.authService.forgotPassword(email).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/auth/login']);

        },
        error: (error) => {
          console.error(error);
        }
      })

    }
  }
}
