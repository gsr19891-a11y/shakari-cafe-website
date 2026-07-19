import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { ApiService } from './api-service';
import { ProductsResponseInterface } from '../interfaces/products-response-interface';
import { DetailsProductInterface } from '../interfaces/details-product-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from './auth-service';
import { map, Observable } from 'rxjs';
import { Dish } from '../interfaces/Dish';


@Injectable({
  providedIn: 'root',
})

export class ProductService {

  

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


public apiUrl = 'https://sheetdb.io/api/v1/xjz8e71xjxt6a';





public products = [
  {
    id:1,
    name:"Choux Rose(Shu)",
    image1:"/shu1.webp",
    image2:"/shu2.webp",
    price:8,
    vegeterian:false,
    categoryId: 1
  },
   {
    id:2,
    name:"Choux Cream Cake",
    image1:"/cake1.webp",
    image2:"/cake2.webp",
    price:8,
    vegeterian:false,
    categoryId: 1
  },
    {
    id:3,
    name:"Eclair",
    image1:"/ecl1.webp",
    image2:"/ecl2.webp",
    image3:"/ecl3.webp",
    image4:"/ecl4.webp",
    image5:"/ecl5.webp",
    price:20,
    vegeterian:false,
    categoryId: 1
  },
    {
    id:4,
    name:"Strawberry in Chocolate",
    image1:"/str1.webp",
    image2:"/str2.webp",
    image3:"/str3.webp",
    price:8,
    vegeterian:false,
    categoryId: 1
  },
    {
    id:5,
    name:"Syrniki with persimmon",
    image1:"/sir1.webp",
    image2:"/sir2.webp",
    price:8,
    vegeterian:false,
    categoryId: 1
  },
    {
    id:6,
    name:"Herring",
    image1:"/herring.webp",
    price:12,
    vegeterian:false,
    categoryId: 2
  },
    {
    id:7,
    name:"Olivier",
    image1:"/oliv.webp",
    price:12,
    vegeterian:false,
    categoryId: 2
  },
    {
    id:8,
    name:"Vinaigrette",
    image1:"/vin.webp",
    price:7,
    vegeterian:true,
    categoryId: 2
  },
    {
    id:9,
    name:"Chickpea Soup",
    image1:"/chi.webp",
    price:6,
    vegeterian:false,
    categoryId: 2
  },
    {
    id:10,
    name:"Buckwheat",
    image1:"/buck.webp",
    price:5,
    vegeterian:true,
    categoryId: 2
  },
    {
    id:11,
    name:"Scramles",
    image1:"/scra.webp",
    price:24,
    vegeterian:false,
    categoryId: 2
  },
    {
    id:12,
    name:"Rice",
    image1:"/rice.webp",
    price:5,
    vegeterian:true,
    categoryId: 2
  },
    {
    id:13,
    name:"Bryanik",
    image1:"/bry.webp",
    price:24,
    vegeterian:false,
    categoryId: 2
  },
    {
    id:14,
    name:"Briosche",
    image1:"/bri.webp",
    price:14,
    vegeterian:true,
    categoryId: 2
  },
    {
    id:15,
    name:"Bliny Classic",
    image1:"/blic.webp",
    price:12,
    vegeterian:false,
    categoryId: 2
  },

]




getMenu(): Observable<Dish[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(item => ({
        id: Number(item.id),
        name: item.name,
        categoryId: Number(item.categoryId),
        price: Number(item.price),
        vegetarian: item.vegetarian?.toUpperCase() === 'TRUE',
        image1: item.image1,
        image2: item.image2 || null,
        image3: item.image3 || null
      })

    
    ))
      
    );
  }







}
