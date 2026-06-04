import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCarts } from '../product-carts/product-carts';

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  categories = signal<any>([]);
  products = signal<any>([]);
  curPage = signal(1);
  hasNextPage = signal(true);
  allCart = signal<any>('');

  filterForm!: FormGroup;
  filterButton: boolean = true;

  constructor(
    private productService: ProductService,
    private change: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  //გვერდის შეცვლა
  setPage(page: number) {
    this.filterForm.patchValue({
      page: page,
    });
    this.onSubmit();
  }

  //შემდეგი გვერდი
  nextPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;

    this.filterForm.patchValue({
      page: currentPage + 1,
    });

    this.onSubmit();
  }

  //წინა გვერდი
  prevPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;

    if (currentPage > 1) {
      this.filterForm.patchValue({
        page: currentPage - 1,
      });

      this.onSubmit();
    }
  }

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data: any) => {
        this.categories.set(data?.data);

        console.log(this.categories());

        this.change.detectChanges();
      },
    });

    this.filterForm = this.fb.group({
      query: [''],
      vegetarian: [false],
      spiciness: [0],
      rate: [0],
      minPrice: [0],
      maxPrice: [9999],
      CategoryId: [0],
      take: [12],
      page: [1],
    });

    //ფილტრაცია
    this.onSubmit();
    this.filterForm.get('query')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('vegetarian')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('spiciness')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('rate')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('minPrice')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('maxPrice')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });

    this.filterForm.get('CategoryId')?.valueChanges.subscribe(() => {
      this.resetPageAndFilter();
    });
  }

  //ფილტრის წაშლა
  resetPageAndFilter() {
    this.filterForm.patchValue({ page: 1 }, { emitEvent: false });

    this.onSubmit();
  }

  onSubmit() {
    this.productService.filterService(this.filterForm.value).subscribe({
      next: (data: any) => {
        this.products.set(data.data.products);

        this.hasNextPage.set(this.products().length === this.filterForm.get('take')?.value);

        this.curPage.set(this.filterForm.get('page')?.value);

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
      next: () => {
        alert('Product added to cart successfully');

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
  }


//ფილტრაციის გვერდის გამოჩენა/დამალვა ტელეფონებისთვის
  filterButtonToggle() {
    this.filterButton = !this.filterButton;
  }







}
