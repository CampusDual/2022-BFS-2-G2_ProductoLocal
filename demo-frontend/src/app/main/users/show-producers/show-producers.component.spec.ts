import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProducersComponent } from './show-producers.component';

describe('ShowProducersComponent', () => {
  let component: ShowProducersComponent;
  let fixture: ComponentFixture<ShowProducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProducersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
