import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { ProductCarts } from '../product-carts/product-carts';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [ProductCarts, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  //ვინახავთ ყველა პროდუქტს ცვლაში სიგნალის საშუალებით
  allProducts = signal<ProductsResponseInterface | null>(null);

  constructor(
    private productService: ProductService,
    private change: ChangeDetectorRef,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.AllProducts();
  }

  //ყველა პროდუქტების ჩატვირთვა
  AllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);

        this.change.detectChanges();
      },
    });
  }
}
