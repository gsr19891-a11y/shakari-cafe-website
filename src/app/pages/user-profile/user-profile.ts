import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  userInfo = signal<any>(null);

  updateForm!: FormGroup;

  constructor(
   
  
    private change: ChangeDetectorRef,

  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      picture: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      address: [''],
      age: [0],
    });

    this.loadUserData();
  }

  onSubmit() {
    this.authService.userEdit(this.updateForm.value).subscribe((res: any) => {
      console.log('success', res);
    });
  }

loadUserData() {
  this.authService.userMe().subscribe({
    next: (res: any) => {
      this.userInfo.set(res);
      this.updateForm.patchValue(res?.data);
      console.log(this.userInfo());
      this.authService.setSession(res?.data || { authenticated: true });
      
      this.change.detectChanges();
    },
    error: (err: any) => {
      if (err.status === 401) {
        console.log('old token! , refresh...');

        this.authService.refreshAccessToken().subscribe({
          next: (tokenRes: any) => {


            localStorage.setItem('access_token', tokenRes.data.accessToken);
            localStorage.setItem('refresh_token', tokenRes.data.refreshToken);
            console.log('token update!');

    
            this.loadUserData();
          },
          error: (refreshErr: any) => {
            console.log('error tpken');
            localStorage.clear();
          }
        });
      }
    }
  });
}


  logOut(){
    this.authService.logout();


    this.userInfo.set(null)
    this.updateForm.reset()
    this.router.navigate(['/']);
    
  }



}
