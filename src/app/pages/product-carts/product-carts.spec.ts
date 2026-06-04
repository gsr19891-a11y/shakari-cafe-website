import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarts } from './product-carts';

describe('ProductCarts', () => {
  let component: ProductCarts;
  let fixture: ComponentFixture<ProductCarts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCarts],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCarts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
