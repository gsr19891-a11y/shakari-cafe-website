import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { ProductCarts } from '../product-carts/product-carts';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { TranslatePipe } from '../../pipes/translate-pipe-pipe';
import { LangService } from '../../services/lang-service';

@Component({
  selector: 'app-home',
  imports: [ProductCarts, RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

langService = inject(LangService)

  private productService = inject(ProductService);



  constructor(
   
    private change: ChangeDetectorRef,
    private authService: AuthService,
  ) {}


  ngOnInit() {
    this.productService.getMenu().subscribe({
      next: (data: any) => {
        this.productService.products = data;
        this.change.detectChanges(); 
        console.log(this.productService.products);
      },
      error: (err) => {
        console.error('Ошибка при загрузке меню из Google Таблиц:', err);
      }
    })
  }




  openWolt() {
  window.open(
    'https://wolt.com/ka/geo/tbilisi/restaurant/shakari-bakery',
    '_blank'
  );
}


}
