import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  //აქაუნტის API-KEY
  APIKEY= '299e7dbe-8ff2-4861-83ee-7cc33ddf7190'

  //ძირითადი ლინკები
  productsUrl= 'https://restaurantapi.stepacademy.ge/api/products'
  categoriesUrl= 'https://restaurantapi.stepacademy.ge/api/categories'
  loginUrl= 'https://restaurantapi.stepacademy.ge/api/auth/login'
  registerUrl= 'https://restaurantapi.stepacademy.ge/api/auth/register'
  verifyUrl= 'https://restaurantapi.stepacademy.ge/api/auth/verify-email'
  resendCodeUrl= 'https://restaurantapi.stepacademy.ge/api/auth/resend-email-verification/'


}