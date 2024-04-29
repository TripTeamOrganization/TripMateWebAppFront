import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccesfullyComponent } from './payment-succesfully.component';

describe('PaymentSuccesfullyComponent', () => {
  let component: PaymentSuccesfullyComponent;
  let fixture: ComponentFixture<PaymentSuccesfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentSuccesfullyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentSuccesfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
