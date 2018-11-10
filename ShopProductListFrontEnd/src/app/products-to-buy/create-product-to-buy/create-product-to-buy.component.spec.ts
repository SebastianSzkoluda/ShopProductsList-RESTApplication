import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductToBuyComponent } from './create-product-to-buy.component';

describe('CreateProductToBuyComponent', () => {
  let component: CreateProductToBuyComponent;
  let fixture: ComponentFixture<CreateProductToBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductToBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
