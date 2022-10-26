import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductProducerComponent } from './show-product-producer.component'

describe('ShowProductProducerComponent', () => {
  let component: ShowProductProducerComponent;
  let fixture: ComponentFixture<ShowProductProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductProducerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
