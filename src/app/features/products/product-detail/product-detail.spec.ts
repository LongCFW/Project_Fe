// Test cơ bản cho ProductDetail
import { TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail';
import { ProductService } from '../../../core/product';
// import { CartService } from '../../../core/cart';
import { ActivatedRoute } from '@angular/router';

describe('ProductDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        ProductService,
        // CartService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '1']]) },
          },
        },
      ],
    });
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(ProductDetail);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
