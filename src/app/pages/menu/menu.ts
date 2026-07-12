import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCarts } from '../product-carts/product-carts';

export interface Product {
  id: number;
  name: string;
  image1: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  price: number;
  vegeterian: boolean;
  categoryId: number;
}

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  standalone: true,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  curPage = signal(1);
  hasNextPage = signal(true);
  allCart = signal<any>('');

  filterForm!: FormGroup;
  filterButton: boolean = true;

  private productService = inject(ProductService);

  constructor(
    private change: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  public products: Product[] = this.productService.products;

  public categories = [
    { id: 1, name: 'Desserts' },
    { id: 2, name: 'Main Dishes' },
  ];

  public filteredProducts: Product[] = [];
 









  setPage(page: number) {
    this.filterForm.patchValue({
      page: page,
    });

  }

  nextPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;

    this.filterForm.patchValue({
      page: currentPage + 1,
    });


  }

  //წინა გვერდი
  prevPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;

    if (currentPage > 1) {
      this.filterForm.patchValue({
        page: currentPage - 1,
      });

      
    }
  }

  ngOnInit() {

    this.filterForm = this.fb.group({
      query: [''],
      CategoryId: [null], 
      minPrice: [null],
      maxPrice: [null]
    });

  
    this.filteredProducts = [...this.products];


    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });

  }

  private applyFilters(filters: any) {
    const searchStr = (filters.query || '').toLowerCase().trim();
    const catId = filters.CategoryId ? Number(filters.CategoryId) : null;
    const min = filters.minPrice !== null && filters.minPrice !== '' ? Number(filters.minPrice) : null;
    const max = filters.maxPrice !== null && filters.maxPrice !== '' ? Number(filters.maxPrice) : null;

    this.filteredProducts = this.products.filter(product => {

      if (searchStr && !product.name.toLowerCase().includes(searchStr)) {
        return false;
      }

   
      if (catId && product.categoryId !== catId) {
        return false;
      }

      if (min !== null && product.price < min) {
        return false;
      }

      if (max !== null && product.price > max) {
        return false;
      }

      return true;
    });
  }


  public resetFilters() {
    this.filterForm.reset({
      query: '',
      CategoryId: null,
      minPrice: null,
      maxPrice: null
    });
  }

  filterButtonToggle() {
    this.filterButton = !this.filterButton;
  }


  


}
