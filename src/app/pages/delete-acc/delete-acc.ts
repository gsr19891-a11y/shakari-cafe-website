import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-acc',
  imports: [],
  templateUrl: './delete-acc.html',
  styleUrl: './delete-acc.scss',
})
export class DeleteAcc {
    private productService = inject(ProductService);

 
  cartQuantity = this.productService.cartQuantity;

  constructor(
    private authService: AuthService,
    private change: ChangeDetectorRef,
    private router: Router
  ){}



  deleteAccount(){
    confirm('Are you sure you want to delete your account?')

    this.authService.deleteAccount().subscribe({
      next: (res: any) => {
        console.log('account deleted');
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    this.authService.logout()
    this.cartQuantity.set(0)
    this.router.navigate(['/']);


    this.change.detectChanges()

  }

}
