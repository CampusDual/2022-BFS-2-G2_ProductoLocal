import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductByAdminComponent } from './create-product-by-admin.component';

describe('CreateProductByAdminComponent', () => {
  let component: CreateProductByAdminComponent;
  let fixture: ComponentFixture<CreateProductByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductByAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
