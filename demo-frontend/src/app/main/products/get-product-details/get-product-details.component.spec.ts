import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProductDetailsComponent } from './get-product-details.component';

describe('GetProductDetailsComponent', () => {
  let component: GetProductDetailsComponent;
  let fixture: ComponentFixture<GetProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
