import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToBuyListComponent } from './product-to-buy-list.component';

describe('ProductToBuyListComponent', () => {
  let component: ProductToBuyListComponent;
  let fixture: ComponentFixture<ProductToBuyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductToBuyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToBuyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
