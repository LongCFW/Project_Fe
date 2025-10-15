// Test cơ bản cho ProductList
import { TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { ProductService } from '../../../core/product';
// import { CartService } from '../../../core/cart';

describe('ProductList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [ProductService, ],//CartService
    });
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(ProductList);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
