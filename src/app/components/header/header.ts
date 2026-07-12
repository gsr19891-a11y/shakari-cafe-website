import { ChangeDetectorRef, Component, inject, signal, effect } from '@angular/core'; // Добавили effect
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { LangService } from '../../services/lang-service';
import { TranslatePipe } from '../../pipes/translate-pipe-pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  public langService = inject(LangService); 

  currentUser = this.authService.currentUser;
  public userToken = signal('');
  cartQuantity = this.productService.cartQuantity;

  buregerToggle = signal(false);
  isContOpen = signal(false);

  constructor(private change: ChangeDetectorRef) {

    effect(() => {
      const _ = this.langService.currentLang(); 
      this.change.detectChanges(); 
    });
  }

  ngOnInit() {
    this.loadCartQuantity();
  }

  // კალათაში დამატებული პროდუქტების რაოდენობა
  loadCartQuantity() {
    if (!this.userToken()) {
      return;
    }
    this.productService.loadCart().subscribe({
      next: (data: any) => {
        this.productService.cartQuantity.set(data.data.items.length);
        console.log(this.cartQuantity());
        this.change.detectChanges();
      },
    });
  }

  logOut() {
    this.authService.logout();
    this.productService.cartQuantity.set(0);
  }

  toggleBurger() {
    this.buregerToggle.set(!this.buregerToggle());
  }
  
  toggleCont() {
    this.isContOpen.set(!this.isContOpen());
  }

  changeLang(event: Event) {
    const target = event.target as HTMLSelectElement;
    const lang = target.value as 'ka' | 'en' | 'ru';
    this.langService.setLanguage(lang);
  }
}