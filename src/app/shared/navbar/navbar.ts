import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../core/cart-state';
import { UserService, User } from '../../core/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  cartHasItem: boolean = false;
  menuOpen: boolean = false;
  searchActive: boolean = false;

  private cartSub!: Subscription;
  private userSub!: Subscription;

  constructor(
    private cartState: CartStateService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // 🟢 1. Lắng nghe thay đổi giỏ hàng
    this.cartSub = this.cartState.cart$.subscribe(items => {
      this.cartHasItem = items.length > 0;
    });

    // 🟢 2. Lắng nghe user từ service
    this.userSub = this.userService.currentUser$.subscribe(user => {
      this.setUser(user);
    });

    // 🟢 3. Lấy user từ localStorage (trường hợp reload)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      this.setUser(parsedUser);
    }

    // 🟢 4. Lắng nghe thay đổi giữa các tab
    window.addEventListener('storage', () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartHasItem = updatedCart.length > 0;

      const updatedUser = localStorage.getItem('currentUser');
      this.setUser(updatedUser ? JSON.parse(updatedUser) : null);
    });
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  /** ✅ Hàm chuẩn hóa dữ liệu user và ép Angular cập nhật view */
  private setUser(user: User | null) {
    if (user && user.avatar) {
      // Nếu avatar không bắt đầu bằng http hoặc /assets thì tự thêm
      if (
        !user.avatar.startsWith('http') &&
        !user.avatar.startsWith('/assets')
      ) {
        user.avatar = '/assets/' + user.avatar.replace(/^assets\//, '');
      }
    }
    this.currentUser = user;
    this.cd.detectChanges(); // ép Angular render lại view
  }

  // Toggle menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;      
  }

  // Toggle search input
  toggleSearch(input: HTMLInputElement) {
    this.searchActive = !this.searchActive;
    if (this.searchActive) input.focus();
  }

  // Scroll top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Logout
  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.userService.logout();
      console.log(this.currentUser);
    }
  }
  
}
