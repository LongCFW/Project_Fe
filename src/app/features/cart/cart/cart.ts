import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartStateService, CartItem } from '../../../core/cart-state';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total = 0;
  showCheckout = false;
  currentUser: any = null; // ✅ lưu thông tin user đăng nhập

  formData = {
    fullname: '',
    email: '',
    phone: '',
    payment: '',
    address: ''
  };

  constructor(private cartState: CartStateService) {}

  ngOnInit() {
    this.cartState.cart$.subscribe(items => {
      this.cart = items;
      this.calcTotal();
    });

    // ✅ Lấy thông tin user đăng nhập
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (this.currentUser) {
      this.formData.fullname = this.currentUser.fullname || '';
      this.formData.email = this.currentUser.email || '';
    }
  }

  calcTotal() {
    this.total = this.cart.reduce((sum, i) => sum + i.gia * i.quantity, 0);
  }

  increaseQty(item: CartItem) {
    this.cartState.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1)
      this.cartState.updateQuantity(item.id, item.quantity - 1);
    else
      this.cartState.removeItem(item.id);
  }

  removeItem(item: CartItem) {
    this.cartState.removeItem(item.id);
  }

  clearCart() {
    if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      this.cartState.clearCart();
    }
  }

  checkout() {
    this.showCheckout = !this.showCheckout;
  }

  submitCheckout() {
    // ✅ Kiểm tra hợp lệ cơ bản
    const isValid =
      (!this.currentUser ? /^[A-Za-zÀ-ỹ\s]+$/.test(this.formData.fullname) : true) &&
      (!this.currentUser ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.formData.email) : true) &&
      /^0\d{9}$/.test(this.formData.phone) &&
      this.formData.payment !== '' &&
      /^[A-Za-zÀ-ỹ0-9\s,.-/]+$/.test(this.formData.address);

    if (!isValid) {
      alert('Vui lòng điền đúng và đủ thông tin.');
      return;
    }

    // ✅ Tạo đơn hàng mới
    const order = {
      id: 'ORD' + Date.now(),
      date: new Date().toISOString(),
      total: this.total,
      items: this.cart.map(i => ({
        id: i.id,
        name: i.name,
        qty: i.quantity,
        price: i.gia,
        img: i.img
      })),
      info: {
        fullname: this.formData.fullname,
        email: this.formData.email,
        phone: this.formData.phone,
        payment: this.formData.payment,
        address: this.formData.address
      }
    };

    // ✅ Lưu lịch sử theo user (nếu có) hoặc guest
    let history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');

    if (this.currentUser) {
      const email = this.currentUser.email;
      let userHistory = history.find((h: any) => h.email === email);
      if (userHistory) {
        userHistory.orders.push(order);
      } else {
        history.push({ email, orders: [order] });
      }
    } else {
      // Lưu vào guestHistory nếu chưa đăng nhập
      let guest = history.find((h: any) => h.email === this.formData.email);
      if (guest) {
        guest.orders.push(order);
      } else {
        history.push({ email: this.formData.email, orders: [order] });
      }
    }

    localStorage.setItem('purchaseHistory', JSON.stringify(history));

    alert('Thanh toán thành công 🎉 Cảm ơn bạn đã mua hàng!');

    this.cartState.clearCart();
    this.showCheckout = false;

    this.formData = { fullname: '', email: '', phone: '', payment: '', address: '' };
  }
}
