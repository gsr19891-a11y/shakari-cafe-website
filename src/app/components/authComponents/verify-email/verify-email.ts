import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
  verifyForm!: FormGroup;
  email: string = '';
  verificationCode: string = '';

  constructor(
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private change: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.verifyForm = this.fb.group({
      code: [''],
    });

    this.email = this.routes.snapshot.paramMap.get('email') || '';

    this.routes.params.subscribe((params) => {
      this.email = params['email'];
    });
  }

  //ვერიფიკაციის დადასტურება
  onSubmit() {
    const verifyData = {
      email: this.email,
      code: this.verifyForm.value.code,
    };

    this.authService.verify(verifyData).subscribe({
      next: (data: any) => {
        console.log(data);

        //ლოკალურ მეხსიერებაშ ტოკენნის შენახვა
        localStorage.setItem('userToken', data.data.accessToken);

        this.authService.setSession({authenticated: true})

        this.router.navigate(['/']);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //კოდის თავიდან გამოგზავნა
  resendCode() {
    this.authService.resendCode(this.email).subscribe({
      next: (data: any) => {
        console.log(data);
        
        localStorage.setItem('userToken', data.data.accessToken);
        this.authService.setSession({ authenticated: true });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
