import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { DetailsProductInterface } from '../../interfaces/details-product-interface';
import { CommonModule } from '@angular/common';
import { ProductCarts } from '../product-carts/product-carts';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  public productId!: number;
  public product = signal<DetailsProductInterface | null>(null);
  public allProduct = signal<any>([]);

  public allCart = signal<any>('');

  public quantity = signal(1);
  public ratingStar = signal<string[]>([]);
  public stars = [1, 2, 3, 4, 5];

  public recommended = signal<any[]>([]);

  constructor(
    private routes: ActivatedRoute,
    private change: ChangeDetectorRef,
    private productService: ProductService,
    private productCarts: ProductCarts,
    private router: Router,
  ) {}

  //პროდუქტის რაოდენობის მომატება კალათაში დამატების დროს
  increment() {
    this.quantity.set(this.quantity() + 1);
  }

  
  //პროდუქტის რაოდენობის დაკლება კალათაში დამატების დროს
  decrement() {
    if (this.quantity() === 1) {
      return this.quantity.set(1);
    }
    this.quantity.set(this.quantity() - 1);
  }

  ngOnInit(): void {
    this.routes.params.subscribe((params) => {
      const id = +params['id'];
      this.productService.getProductById(id).subscribe((res: any) => {
        this.product.set(res);
      });
    });

    this.getProducts();
  }

    //მხოლოდ 3 პროდუქტის ჩატვირთვა რანდომულად
  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        const limit = data.data.products.slice(0, 3);
        const randomize = limit.sort(() => Math.random() - 0.5).slice(0, 4);
        this.allProduct.set(randomize);

        console.log(this.allProduct());
        this.change.detectChanges();
      },
    });
  }

  //კალათაში დამატება
  addToCart(id: number) {
    const body = {
      productId: id,
      quantity: this.quantity(),
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
      error:()=>{
        alert('Please log in to add items to your cart.')
      }
    });

    return this.productService.addToCart(id);
  }

  //მენუში გასვლა
  backToMenu() {
    this.router.navigate(['/menu']);
  }
}
