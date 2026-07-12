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

  allProducts = this.productService.products;

  constructor(
   
    private change: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    console.log(this.allProducts);

    
  }


}
