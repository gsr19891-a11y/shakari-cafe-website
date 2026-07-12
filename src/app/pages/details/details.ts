import { ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ProductsResponseInterface } from '../../interfaces/products-response-interface';
import { DetailsProductInterface } from '../../interfaces/details-product-interface';
import { CommonModule } from '@angular/common';
import { ProductCarts } from '../product-carts/product-carts';
import { Menu } from '../menu/menu';
import { LangService } from '../../services/lang-service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  public product = signal<any>('');
  public langService = inject(LangService);

  public allProduct = signal<any>('');
  public allCart = signal<any>('');

  public quantity = signal(1);
private productService = inject(ProductService);


  private randomNumber = Math.floor(Math.random() * (this.productService.products.length - 3));

  public randomNum = signal(0);

  




  public recommended = signal<any[]>([]);
  

  constructor(
    private routes: ActivatedRoute,
    private change: ChangeDetectorRef,
    private productCarts: ProductCarts,
    private router: Router,
  ) {
    effect(() => {
      const currentProduct = this.product();
      

      this.selectedImage.set(''); 
    });

  }


  increment() {
    this.quantity.set(this.quantity() + 1);
  }

  decrement() {
    if (this.quantity() === 1) {
      return this.quantity.set(1);
    }
    this.quantity.set(this.quantity() - 1);
  }


  ngOnInit(): void {

this.randomNum.set(Math.floor(Math.random() * 34) + 6);


    this.allProduct.set(this.productService.products.slice(this.randomNumber, this.randomNumber + 3));

    this.product.set(this.productService.products);

    console.log(this.product());

    this.routes.params.subscribe((params) => {
      const id = +params['id'];

      const foundCar = this.productService.products.find((c) => c.id === id);

      if (foundCar) {
        this.product.set(foundCar);
      }
    });
  }

  backToMenu() {
    this.router.navigate(['/menu']);
  }


  
  public selectedImage = signal<string>('');

  // Вычисляемый массив всех картинок, которые есть у этого продукта
public productImages = computed(() => {
    const p = this.product();
    if (!p) return [];
    return [p.image1, p.image2, p.image3, p.image4, p.image5].filter(img => !!img);
  });

  // Активное изображение для отображения
  public currentMainImage = computed(() => {
    // Если юзер кликал на миниатюру — берем её, иначе дефолтную image1 нового товара
    return this.selectedImage() || this.product()?.image1 || '';
  });

  public changeImage(imgUrl: string) {
    this.selectedImage.set(imgUrl);
  }



  public Count = signal(1);
  public countMenu = this.Count() || 0;



 decrementDays(): void {
    if (this.Count() > 1) {
      this.Count.update((countMenu) => countMenu - 1);
    }
  }




 incrementDays(): void {

    this.Count.update((countMenu) => countMenu + 1);
 }



 totalPrice = computed(() => {
 
  const basePrice = Number(this.product().price) || 0;


  const finalPricePerDay = basePrice * this.Count();


  return finalPricePerDay;
});

 sendToWhatsapp(car: any) {

const phone = '595225485';

const message = `
Здравствуйте.
хочу заказать у вас:

${this.product().name},
${this.Count()} Штуки/Штуку,
Цена: ${this.totalPrice()} Лари
Спасибо!.
`;
console.log(message);


  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}







}
