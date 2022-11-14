import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetProducerComponent } from './get-producer.component';

describe('GetProducerComponent', () => {
  let component: GetProducerComponent;
  let fixture: ComponentFixture<GetProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProducerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
