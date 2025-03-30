import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSlateComponent } from './error-slate.component';

describe('ErrorSlateComponent', () => {
  let component: ErrorSlateComponent;
  let fixture: ComponentFixture<ErrorSlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSlateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorSlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
