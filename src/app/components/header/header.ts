import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { AuthService } from '../../services/auth-service';
import { UserCart } from '../../pages/user-cart/user-cart';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);
  private productService = inject(ProductService);

  currentUser = this.authService.currentUser;

  public userToken = signal('');

  cartQuantity = this.productService.cartQuantity;

  constructor(private change: ChangeDetectorRef) {}

  ngOnInit() {

    this.loadCartQuantity();
  }

  //კალათაში დამატებული პროდუქტების რაოდენობა
  loadCartQuantity() {
    if(!this.userToken()) {
      return
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

}
