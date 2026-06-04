import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAcc } from './delete-acc';

describe('DeleteAcc', () => {
  let component: DeleteAcc;
  let fixture: ComponentFixture<DeleteAcc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAcc],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAcc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
