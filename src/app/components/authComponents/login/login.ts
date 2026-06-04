import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginForm!: FormGroup
  userToken = signal<any>('')


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router

  ){}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

//აქაუნტში შესვლის დადასტურება
onSubmit() {
  if (this.loginForm.valid) { 

    this.authService.login(this.loginForm.value).subscribe({
      next: (data: any) => {

        console.log(data);
        this.userToken.set(data);

        localStorage.setItem('userToken', data?.data?.accessToken);
        if (data?.data?.refreshToken) {
          localStorage.setItem('refresh_token', data.data.refreshToken);
        }
        console.log(this.userToken());

        const userPayload = data?.data?.user || { authenticated: true };
        this.authService.setSession(userPayload);


        //მთავარი გვერდის გახსნა 
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error)

      }
    })
  } else {
    console.log( this.loginForm.value);
  }
}


}
