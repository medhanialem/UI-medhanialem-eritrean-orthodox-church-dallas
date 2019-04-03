import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SundaySchoolComponent } from './sunday-school.component';

describe('SundaySchoolComponent', () => {
  let component: SundaySchoolComponent;
  let fixture: ComponentFixture<SundaySchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SundaySchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SundaySchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
