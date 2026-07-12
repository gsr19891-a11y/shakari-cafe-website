import { ChangeDetectorRef, Component, inject, Injectable, Input, input, signal } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LangService } from '../../services/lang-service';
import { TranslatePipe } from '../../pipes/translate-pipe-pipe';

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

  public allCart = signal<any>('');

  private productService = inject(ProductService);
  langService = inject(LangService)
 allProducts = this.productService.products;


  @Input() product!: any;

  constructor(
    private change: ChangeDetectorRef,
  ) {}

  ngOnInit() {


    this.allProducts = this.productService.products
    console.log(this.allProducts);

  }



}
