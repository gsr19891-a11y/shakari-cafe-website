import { Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userToken = signal<string>('')
  //ინფორმაცია აქაუნტზე
  currentUser = signal<any>(localStorage.getItem('userToken') ? { authenticated: true } : null);




  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ){}


  login(form: any){
    return  this.http.post(this.apiService.loginUrl,form,{
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }

  //ინფორმაციის მიღება user-ზე
  setSession(userData:any){
    this.currentUser.set(userData);
  }

  logout(){
    localStorage.clear();
    this.currentUser.set(null)
    this.router.navigate(['/auth/login']);
  }


  register(form: any){
    return this.http.post(this.apiService.registerUrl,form, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }

  //აქაუნტის ვერიფიკაცია რეგისტრაციის მერე
  verify(form: any){
    return this.http.put(this.apiService.verifyUrl,form, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }

//კოდის თავიდან გამოგზავნა
  resendCode(email: string){
    return this.http.post(this.apiService.resendCodeUrl,{email}, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }

  getToken(): string{
    return localStorage.getItem('userToken') || '';
  }

//პროფილის ინფორმაციის მიღება 
  userMe(){
    const token = this.getToken()
    return this.http.get('https://restaurantapi.stepacademy.ge/api/users/profile',{
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY,
        'Authorization': `Bearer ${token}`
      }
    })
  }

  //პროფილის რედაქტირება
  userEdit(form: any){
    const token = this.getToken()
    return this.http.put('https://restaurantapi.stepacademy.ge/api/users/edit',form, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY,
        'Authorization': `Bearer ${token}`
      }
    })
  }


//ტოკენის განახლება
refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');


    return this.http.post<any>(`https://restaurantapi.stepacademy.ge/api/auth/refresh-access-token/${refreshToken}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY,
        'Authorization': `Bearer ${refreshToken}`
      }
    })
  }

  forgotPassword(email: string){
    return this.http.post(`https://restaurantapi.stepacademy.ge/api/auth/forgot-password/${email}`,
      {},{
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }



  changePassword(body:any){
    const token = this.getToken()
    return this.http.put('https://restaurantapi.stepacademy.ge/api/users/change-password', body,{
        headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
  }


  deleteAccount(){
    const token = this.getToken()
    return this.http.delete('https://restaurantapi.stepacademy.ge/api/users/delete',{
      headers:{
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY,
        'Authorization': `Bearer ${token}`
      }
    })
  }


  }



