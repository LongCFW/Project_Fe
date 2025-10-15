import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  img: string;
  gia: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private _cart$ = new BehaviorSubject<CartItem[]>(this._readFromStorage());
  readonly cart$ = this._cart$.asObservable();

  // ✅ Subject riêng cho trạng thái có hàng trong giỏ (dot đỏ)
  private cartHasItemSubject = new BehaviorSubject<boolean>(this._readFromStorage().length > 0);
  readonly cartHasItem$ = this.cartHasItemSubject.asObservable();

  constructor() {}

  // === Helpers ===
  private _readFromStorage(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  }

  private _writeToStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this._cart$.next(items);
    this.cartHasItemSubject.next(items.length > 0);
  }

  // === Public APIs ===
  getSnapshot(): CartItem[] {
    return this._cart$.getValue();
  }

  setCart(items: CartItem[]) {
    this._writeToStorage(items);
  }

  addToCart(item: CartItem) {
  const cart = this._cart$.value;
  const index = cart.findIndex(i => i.id === item.id);
  if (index !== -1) {
    // cộng đúng quantity bạn gửi từ modal
    cart[index].quantity += item.quantity; 
  } else {
    cart.push({ ...item }); // giữ quantity ban đầu
  }
  // this._cart$.next([...cart]); // phát ra observable mới
  this._writeToStorage([...cart]);
}


  updateQuantity(id: number, qty: number) {
    const cart = this.getSnapshot().slice();
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    if (qty <= 0) cart.splice(idx, 1);
    else cart[idx].quantity = qty;
    this._writeToStorage(cart);
  }

  removeItem(id: number) {
    const cart = this.getSnapshot().filter(i => i.id !== id);
    this._writeToStorage(cart);
  }

  clearCart() {
    this._writeToStorage([]);
  }

  totalQuantity(): number {
    return this.getSnapshot().reduce((s, i) => s + (i.quantity || 0), 0);
  }

  // Giữ lại API cũ để tránh lỗi
  setHasItem(hasItem: boolean): void {
    this.cartHasItemSubject.next(hasItem);
  }
}
