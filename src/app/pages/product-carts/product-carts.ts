import { ChangeDetectorRef, Component, Injectable, Input, input, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-carts',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-carts.html',
  styleUrl: './product-carts.scss',
})
@Injectable({
  providedIn: 'root',
})
export class ProductCarts {
  public allProducts = signal<ProductsResponseInterface | null>(null);

  public allCart = signal<any>('');

  @Input() product!: ProductsResponseInterface;

  constructor(
    private productService: ProductService,
    private change: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  //ყველა პროდუქტის მიღება
  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        console.log(this.allProducts());
        this.change.detectChanges();
      },
    });
  }

  //კალათაში დამატება
  addToCart(id: number) {
    const body = {
      productId: id,
      quantity: 1,
    };
    this.productService.addToCart(body).subscribe({
      next: (data) => {
        this.allCart.set(data);
        alert('Product added to cart successfully');

        console.log(this.allCart());

        this.productService.loadCart().subscribe({
          next: (cartData: any) => {
            this.productService.cartQuantity.set(cartData.data.items.length);
          },
        });
      },
      error:() =>{
        alert('Please log in to add items to your cart.')
      }
    });

    return this.productService.addToCart(id);
  }
}
