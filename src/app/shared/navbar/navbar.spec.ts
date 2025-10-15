// Test cơ bản cho Navbar
import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar';

describe('Navbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
