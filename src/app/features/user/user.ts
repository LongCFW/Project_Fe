// ========================= IMPORTS =========================
// Các module cần thiết để component hoạt động
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/user';

// ========================= INTERFACES =========================
// Định nghĩa kiểu dữ liệu cho người dùng
interface UserData {
  name: string;
  email: string;
  password: string;
}

// Định nghĩa kiểu dữ liệu cho đơn hàng
interface Order {
  id: number;
  date: string;
  total: number;
  items: { name: string; qty: number }[];
}

// ========================= COMPONENT =========================
@Component({
  selector: 'app-user', // Tên selector gọi trong HTML
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class User implements OnInit {

  // ========================= STATE & FORM CONTROL =========================
  // Quản lý hiển thị form và trạng thái hiện tại
  formTitle = 'Sign in';
  showLogin = true; // hiển thị form đăng nhập
  showSignup = false; // hiển thị form đăng ký
  loginError = false; // báo lỗi đăng nhập (email/password sai)

  // Dữ liệu nhập trong form login và signup
  loginData = { email: '', password: '' };
  signupData = { name: '', email: '', password: '' };

  // Lưu trữ thông tin người dùng hiện tại và lịch sử đơn hàng
  currentUser: UserData | null = null;
  orders: Order[] = [];

  // ========================= CONSTRUCTOR =========================
  constructor(private userService: UserService) { }

  // ========================= LIFE CYCLE: ONINIT =========================
  ngOnInit() {
    // Kiểm tra xem có người dùng nào đang đăng nhập không
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.userService.setUser(this.currentUser);
      this.showLogin = false;
      this.showSignup = false;

      // Nếu có user thì hiển thị lịch sử mua hàng
      if (this.currentUser) {
        this.renderPurchaseHistory(this.currentUser.email);
      }
    }

    // Theo dõi thay đổi từ service (observable)
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // ========================= FORM SWITCHER =========================
  /**
   * Đổi giữa form Login và Sign Up
   * @param type 'login' hoặc 'signup'
   */
  switchForm(type: 'login' | 'signup') {
    this.showLogin = type === 'login';
    this.showSignup = type === 'signup';
    this.formTitle = type === 'login' ? 'Sign in' : 'Sign up';
    this.loginError = false;
  }

  // ========================= SIGNUP LOGIC =========================
  /**
   * Xử lý đăng ký người dùng mới
   */
  onSignup() {
    const { name, email, password } = this.signupData;

    // Kiểm tra dữ liệu nhập đầy đủ
    if (!name || !email || !password) {
      alert('Please fill in all required fields!');
      return;
    }

    // Lấy danh sách người dùng trong localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Kiểm tra trùng email
    if (users.some((u: any) => u.email === email)) {
      alert('Email already exists!');
      return;
    }

    // Tạo user mới và lưu vào localStorage
    const newUser: UserData = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful! Please log in.');

    // Sau khi đăng ký xong thì chuyển về form login
    this.switchForm('login');
  }

  // ========================= LOGIN LOGIC =========================
  /**
   * Xử lý đăng nhập người dùng
   */
  onLogin() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Tìm người dùng trùng khớp email & password
    const foundUser = users.find(
      (u: any) =>
        u.email === this.loginData.email &&
        u.password === this.loginData.password
    );

    if (foundUser) {
      // Nếu đúng: lưu user, cập nhật trạng thái và render lịch sử
      this.currentUser = foundUser;
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.userService.setUser(foundUser);

      alert('Welcome ' + foundUser.name + '!');
      this.renderPurchaseHistory(foundUser.email);

      this.showLogin = false;
      this.showSignup = false;
      this.loginError = false;
    } else {
      // Nếu sai: hiển thị thông báo lỗi
      this.loginError = true;
    }
  }

  // ========================= LOGOUT LOGIC =========================
  /**
   * Xử lý đăng xuất
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.userService.logout();
    this.switchForm('login');
  }

  // ========================= PURCHASE HISTORY =========================
  /**
   * Hiển thị lịch sử mua hàng theo email người dùng
   */
  renderPurchaseHistory(email: string) {
    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    const userHistory = history.find((u: any) => u.email === email);
    this.orders = userHistory?.orders || [];
  }

  // ========================= NOTES / POTENTIAL OPTIMIZATIONS =========================
  /**
   * Ghi chú:
   * - [1] localStorage.getItem('users') và getItem('currentUser') được dùng nhiều lần → 
   *       có thể tách ra thành helper method như `getLocalUsers()` để tránh lặp.
   * - [2] alert() có thể thay bằng UI-friendly toast (sweetalert2, bootstrap toast...)
   * - [3] Việc subscribe userService.currentUser$ không có unsubscribe (vì không gây leak trong component root-level, nhưng nên chú ý nếu dùng trong child).
   * - [4] Có thể thêm kiểm tra định dạng email hoặc validate password mạnh hơn.
   * - [5] Nếu dự án mở rộng: tách riêng logic login/signup vào service (AuthService).
   */
}
