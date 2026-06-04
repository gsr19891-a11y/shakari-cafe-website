import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.scss',
})
export class ResetPasswordPage {

  resetPassForm!: FormGroup;
  isPasswordHidden: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}



  ngOnInit() {
    this.resetPassForm = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  //პაროლის შეცვლა აქაუნტზე
  changePassword() {
    if(this.resetPassForm.value.newPassword !== this.resetPassForm.value.confirmPassword){
      alert('Passwords do not match');
      return
    }

    const requestBody = {
      oldPassword: this.resetPassForm.value.oldPassword,
      newPassword: this.resetPassForm.value.newPassword,
      confirmPassword: this.resetPassForm.value.confirmPassword
    }
    

    this.authService.changePassword(requestBody).subscribe({
      next: (data) => {
        console.log(data);
        alert('Password changed successfully');
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  //პაროლის განოჩენა/დამალვა
  togglePasswordVisibility() {
    this.isPasswordHidden = !this.isPasswordHidden;
  }







}
