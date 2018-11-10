import { TestBed, inject } from '@angular/core/testing';

import { ProductToBuyService } from './product-to-buy.service';

describe('ProductToBuyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductToBuyService]
    });
  });

  it('should be created', inject([ProductToBuyService], (service: ProductToBuyService) => {
    expect(service).toBeTruthy();
  }));
});
