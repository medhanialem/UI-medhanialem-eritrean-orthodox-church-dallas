import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPaymentPreviewComponent } from './member-payment-preview.component';

describe('MemberPaymentPreviewComponent', () => {
  let component: MemberPaymentPreviewComponent;
  let fixture: ComponentFixture<MemberPaymentPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPaymentPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPaymentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
