import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductToBuyComponent } from './edit-product-to-buy.component';

describe('EditProductToBuyComponent', () => {
  let component: EditProductToBuyComponent;
  let fixture: ComponentFixture<EditProductToBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductToBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductToBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
