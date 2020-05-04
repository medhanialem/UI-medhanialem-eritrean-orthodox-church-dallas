import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveMemberComponent } from './move-member.component';

describe('MoveMemberComponent', () => {
  let component: MoveMemberComponent;
  let fixture: ComponentFixture<MoveMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
