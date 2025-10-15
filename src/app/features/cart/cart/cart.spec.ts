// Test cơ bản cho CartComponent
import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart';
// Update the import path below to the correct location of CartService
// import { CartService } from '../../cart'; // Example: adjust this path as needed

describe('CartComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartComponent],
      // providers: [CartService],
    });
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(CartComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
