import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './user-cart.html',
  styleUrl: './user-cart.scss',
})
export class UserCart {

 public allCart = signal<any>('');





  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private change: ChangeDetectorRef
  ) {}


  ngOnInit(){
this.getCartData()


    
  }


//კალათაში დამატება
getCartData(){
  this.productService.loadCart().subscribe({
    next: (data:any) => {

      this.allCart.set(data.data.items);

      this.productService.cartQuantity.set(
        data.data.items.length
      );

      this.change.detectChanges();
    }
  })
}

//რაოდენობის მომატება
  increment(cartItem:any) {
    const newQuantity = cartItem.quantity + 1;

    this.productService.editQuantity(cartItem.id, newQuantity).subscribe({
      next: (data) => {
        this.getCartData();
      },
    });

  
}

//რაოდენობის დაკლება
decrement(cartItem:any) {
  if(cartItem.quantity === 1){
    return
  }

   const newQuantity = cartItem.quantity - 1;
  
    this.productService.editQuantity(cartItem.id, newQuantity).subscribe({
      next: (data) => {
        this.getCartData();
      },
    })
}

//კალათიდან მენუს წაშლა
deleteCarts(id:number){
  this.productService.deleteCart(id).subscribe({
    next: (data) => {
      this.getCartData();
    },
  })
}



//ფასის გამოთვლა
subTotal(){
  if(this.allCart().length === 0){
    return 0
  }
  let total = 0;

  this.allCart().forEach((item:any) => {
    total += item.product.price * item.quantity;
  });

  return total
}

taxAmount(){
  return this.subTotal() * 0.1
}


totalPrice(){
 
  return this.subTotal() + this.taxAmount()
}

finalPrice(cartItem:any){
  return cartItem.product.price * cartItem.quantity

}



//პროდუქტის ყიდვა
checkOut() {
  this.productService.checkout().subscribe({
    next: (data: any) => {
      console.log('success', data);

     alert('You success checkout!');
     
      this.productService.cartQuantity.set(0);


      this.allCart.set([]); 
      
      this.productService.loadCart().subscribe();
    },
    error: (err) => {
      console.error('error', err);
    }
  });
}






}