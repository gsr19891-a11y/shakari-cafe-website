import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { ApiService } from './api-service';
import { ProductsResponseInterface } from '../interfaces/products-response-interface';
import { DetailsProductInterface } from '../interfaces/details-product-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root',
})

export class ProductService {

  
  public products = signal<any>([]);//ინახება ყველა კერძები
  public categories = signal<any>([]);//ინახება ყველა კერძების კატეგორია
  public cartQuantity = signal(0);//ვინახავთ დამატებული კერძების რაოდენობას

  constructor(
    private http:HttpClient,
    private apiService: ApiService,
    private authService: AuthService
  ) {}
  

  //ყველა კერძების მიღების მეთოდი
  getAllProducts(){
    return this.http.get<ProductsResponseInterface>(this.apiService.productsUrl, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    });
  }

  //კერძის მიღება აიდის საშუალებით
  getProductById(id:number){
    return this.http.get<DetailsProductInterface>(this.apiService.productsUrl+ `/${id}`, {
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }

  //კატეგორიები
  getCategories(){
    return this.http.get<any>(this.apiService.categoriesUrl,{
      headers: {
        'Accept': 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    })
  }




  //მენუს ფილტრაცია
filterService(filters: any) {

  let params = new HttpParams()
    .set('Take', String(filters.take || 12))
    .set('Page', String(filters.page || 1));

  if (filters.query) {
    params = params.set('Query', filters.query);
  }

  if (filters.vegetarian) {
    params = params.set('Vegetarian', 'true');
  }

  if (filters.spiciness > 0) {
    params = params.set('Spiciness', String(filters.spiciness));
  }

  if (filters.rate > 0) {
    params = params.set('Rate', String(filters.rate));
  }

  if (
    filters.minPrice !== null &&
    filters.minPrice !== undefined &&
    filters.minPrice > 0
  ) {
    params = params.set('MinPrice', String(filters.minPrice));
  }

 if (
    filters.maxPrice !== null &&
    filters.maxPrice !== undefined &&
    filters.maxPrice > 0
  ) {
    params = params.set('MaxPrice', String(filters.maxPrice));
  }

  if (filters.CategoryId) {
    params = params.set('CategoryId', String(filters.CategoryId));
  }

  return this.http.get<any>(
    'https://restaurantapi.stepacademy.ge/api/products/filter',
    {
      params,
      headers: {
        Accept: 'application/json',
        'x-api-key': this.apiService.APIKEY
      }
    }
  );
}



//დამატებული კერძების სიის მიღება
loadCart(){

  const token = this.authService.getToken();

  return this.http.get<any>('https://restaurantapi.stepacademy.ge/api/cart', {
    headers: {
      'Accept': 'application/json',
      'x-api-key': this.apiService.APIKEY,
      'Authorization': `Bearer ${token}`


    }
  })
}


//კერძების დამატება კალათაში
addToCart(cart: any){
  const token = this.authService.getToken();
  return this.http.post<any>('https://restaurantapi.stepacademy.ge/api/cart/add-to-cart',cart,{
    headers: {
      'Accept': 'application/json',
      'x-api-key': this.apiService.APIKEY,
      'Authorization': `Bearer ${token}`
    }
  })
}

//კალათაში კერძების რაოდენობის რედაქტირება
editQuantity(itemId:number, quantity:number){
  const token = this.authService.getToken();
  return this.http.put<any>('https://restaurantapi.stepacademy.ge/api/cart/edit-quantity', {itemId, quantity}, {
     headers: {
      'Accept': 'application/json',
      'x-api-key': this.apiService.APIKEY,
      'Authorization': `Bearer ${token}`
    }
  })
}

//მენუს წაშლა კალათიდან
deleteCart(id:number){
  const token = this.authService.getToken();
  return this.http.delete<any>(`https://restaurantapi.stepacademy.ge/api/cart/remove-from-cart/${id}`,{
        headers: {
      'Accept': 'application/json',
      'x-api-key': this.apiService.APIKEY,
      'Authorization': `Bearer ${token}`
    }
  })
}



//ყიდვა
checkout(){
  const token = this.authService.getToken()

 return this.http.post('https://restaurantapi.stepacademy.ge/api/cart/checkout',
    {},
    {
    headers: {
      'Accept': 'application/json',
      'x-api-key': this.apiService.APIKEY,
      'Authorization': `Bearer ${token}`
    }
  })
}



}
