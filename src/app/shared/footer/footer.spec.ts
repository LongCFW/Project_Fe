// Test cơ bản cho Footer
import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Footer],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Footer);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
