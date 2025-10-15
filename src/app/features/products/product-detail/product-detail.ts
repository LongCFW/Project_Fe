import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartStateService } from '../../../core/cart-state';

interface Product {
  id: number;
  name: string;
  img: string;
  gia: number;
  category: string;
  subCategory: string;
  size: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DecimalPipe, NgIf, NgFor, FormsModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();
  // ✅ emit object gồm product + quantity
  @Output() addToCart = new EventEmitter<{ product: Product, quantity: number }>();

  quantity: number = 1;
  toastMessage: string | null = null;

  constructor(private cartState: CartStateService) { }

  onClose() {
    this.close.emit();
  }

  // ✅ emit cả quantity, không tự update localStorage ở đây
  onAddToCart() {
    this.addToCart.emit({ product: this.product, quantity: this.quantity });
    this.showToast(`${this.product.name} đã được thêm vào giỏ hàng!`);
    // không gọi this.onClose() → modal vẫn mở
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }

  validateQty() {
    if (this.quantity < 1 || isNaN(this.quantity)) this.quantity = 1;
  }

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000);
  }
}
