import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPaymentReceiptComponent } from './member-payment-receipt.component';

describe('MemberPaymentReceiptComponent', () => {
  let component: MemberPaymentReceiptComponent;
  let fixture: ComponentFixture<MemberPaymentReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPaymentReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
