// ========================================
// 🧩 FILE: src/app/core/user.service.ts
// ✅ Quản lý trạng thái user toàn app
// ========================================
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// 🔹 Interface mô tả user
export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 🔹 BehaviorSubject để theo dõi user hiện tại
  private _currentUser$ = new BehaviorSubject<User | null>(this.loadUser());
  readonly currentUser$ = this._currentUser$.asObservable();

  constructor() {
    // 🟢 Khi localStorage thay đổi từ tab khác → cập nhật
    window.addEventListener('storage', () => {
      const user = this.loadUser();
      this._currentUser$.next(user);
    });
  }

  // ==============================
  // 🔸 Đọc user từ localStorage
  // ==============================
  private loadUser(): User | null {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }

  // ==============================
  // 🔸 Ghi user vào localStorage + emit
  // ==============================
  setUser(user: User | null) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._currentUser$.next(user);
    } else {
      localStorage.removeItem('currentUser');
      this._currentUser$.next(null);
    }
  }

  // ==============================
  // 🔸 Lấy user hiện tại (sync ngay)
  // ==============================
  getUser(): User | null {
    return this._currentUser$.value;
  }

  // ==============================
  // 🔸 Đăng xuất
  // ==============================
  logout() {
    this.setUser(null);
  }
}
