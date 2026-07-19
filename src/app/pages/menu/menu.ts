import { ChangeDetectorRef, Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dish } from '../../interfaces/Dish';

// Интерфейсы Product и Dish у тебя практически одинаковые, 
// поэтому используем Dish (или оставь Product, если они завязаны на HTML)
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
export class Menu implements OnInit {
  curPage = signal(1);
  hasNextPage = signal(true);
  allCart = signal<any>('');

  filterForm!: FormGroup;
  filterButton: boolean = true;

  private productService = inject(ProductService);

  // Храним оригинальный список продуктов
  public products: Dish[] = [];
  // Список продуктов после фильтрации, который выводится в HTML
  public filteredProducts: Dish[] = [];

  public categories = [
    { id: 1, name: 'Desserts' },
    { id: 2, name: 'Main Dishes' },
  ];

  constructor(
    private change: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // 1. Инициализируем форму
    this.filterForm = this.fb.group({
      query: [''],
      CategoryId: [null], 
      minPrice: [null],
      maxPrice: [null],
      page: [1] // Добавил поле page в форму, так как ты используешь patchValue для него
    });

    // 2. Получаем данные из Google Sheets через сервис асинхронно
    this.productService.getMenu().subscribe({
      next: (data: Dish[]) => {
        this.products = data;
        // После загрузки данных сразу применяем фильтры (чтобы отобразить начальный список)
        this.applyFilters(this.filterForm.value);
        this.change.detectChanges(); // Форсируем обновление UI, если нужно
      },
      error: (err) => {
        console.error('Ошибка при загрузке меню из Google Таблиц:', err);
      }
    });

    // 3. Следим за изменениями фильтров
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  private applyFilters(filters: any) {
    const searchStr = (filters.query || '').toLowerCase().trim();
    // Обрабатываем ситуацию, когда выбрано "All" (CategoryId: null)
    const catId = filters.CategoryId && filters.CategoryId !== 'null' ? Number(filters.CategoryId) : null;
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

  // --- Навигация по страницам (Пагинация) ---
  setPage(page: number) {
    this.filterForm.patchValue({ page: page });
  }

  nextPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;
    this.filterForm.patchValue({ page: currentPage + 1 });
  }

  prevPage() {
    const currentPage = this.filterForm.get('page')?.value || 1;
    if (currentPage > 1) {
      this.filterForm.patchValue({ page: currentPage - 1 });
    }
  }

  public resetFilters() {
    this.filterForm.reset({
      query: '',
      CategoryId: null,
      minPrice: null,
      maxPrice: null,
      page: 1
    });
  }

  filterButtonToggle() {
    this.filterButton = !this.filterButton;
  }
}