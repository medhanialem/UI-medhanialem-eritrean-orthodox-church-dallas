import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberDialogCloseComponent } from './add-member-dialog-close.component';

describe('AddMemberDialogCloseComponent', () => {
  let component: AddMemberDialogCloseComponent;
  let fixture: ComponentFixture<AddMemberDialogCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberDialogCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberDialogCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
