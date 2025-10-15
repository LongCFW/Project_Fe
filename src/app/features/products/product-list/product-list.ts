import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetail } from '../product-detail/product-detail';
import { CartStateService } from '../../../core/cart-state'; // 🟢 service quản lý giỏ hàng toàn cục

// ==========================
// 🧩 Interface định nghĩa sản phẩm
// ==========================
interface Product {
  id: number;
  name: string;
  img: string;
  gia: number;
  category: string;
  subCategory: string;
  size: string;
}

// ==========================
// 🛍️ Component ProductList (Trang Shop chính)
// ==========================
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductDetail],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList {
  // ========== DỮ LIỆU CƠ BẢN ==========
  data: Product[] = [];
  displayedProducts: Product[] = [];
  filteredData: Product[] = [];
  productsPerPage = 8;
  currentCount = this.productsPerPage;
  showAll = false;

  filter = { category: 'all', subCategory: 'all', size: 'all', price: 'all' };
  subCategories = ['áo thun', 'áo sơ mi', 'áo khoác', 'áo len', 'cardigan', 'hoodie', 'áo polo', 'quần jean', 'quần kaki'];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  selectedProduct: Product | null = null;
  toastMessage: string | null = null;

  // 🧠 Không còn dùng localStorage trực tiếp
  constructor(private cartState: CartStateService) {
    this.initData();
    this.filteredData = this.data;
    this.render();
  }

  quantity = 1;
  modalStats = '';

  // ==========================
  // 🔹 HÀM SINH SIZE NGẪU NHIÊN
  // ==========================
  randomSize() {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  // ==========================
  // 🔹 KHỞI TẠO DỮ LIỆU SẢN PHẨM (fake data)
  // ==========================
  initData() {
    this.data = [
      { id: 1, name: "áo thun đen trơn boxy", img: "assets/images/thun_tron.jpg", gia: 581000, category: "ao", subCategory: "áo thun", size: this.randomSize() },
      { id: 2, name: "áo len lông nỉ", img: "assets/images/ao_len.jpg", gia: 456000, category: "ao", subCategory: "áo len", size: this.randomSize() },
      { id: 3, name: "áo len cao cổ", img: "assets/images/ao_len1.jpg", gia: 511000, category: "ao", subCategory: "áo len", size: this.randomSize() },
      { id: 4, name: "áo len cổ tròn", img: "assets/images/ao_len3.jpg", gia: 234000, category: "ao", subCategory: "áo len", size: this.randomSize() },
      { id: 5, name: "Collared Cardigan", img: "assets/images/cardigan4.jpg", gia: 735000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 6, name: "V-neck Cardigan", img: "assets/images/cardigan23.jpg", gia: 227000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 7, name: "Shawl Collar Cardigan", img: "assets/images/cardigan.jpg", gia: 208000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 8, name: "Oversized V-neck Cardigan", img: "assets/images/cardigan1.jpg", gia: 207000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 9, name: "Basic Knit Cardigan", img: "assets/images/cardigan2.jpg", gia: 826000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 10, name: "jean ống rộng", img: "assets/images/jean_ongrong.jpg", gia: 265000, category: "quan", subCategory: "quần jean", size: this.randomSize() },
      { id: 11, name: "Basic Knit Cardigan", img: "assets/images/cardigan2.jpg", gia: 826000, category: "ao", subCategory: "cardigan", size: this.randomSize() },
      { id: 12, name: "jean ống rộng", img: "assets/images/jean_ongrong.jpg", gia: 265000, category: "quan", subCategory: "quần jean", size: this.randomSize() },
    ];
  }

  // ==========================
  // 🔹 HIỂN THỊ DANH SÁCH SẢN PHẨM
  // ==========================
  render() {
    this.displayedProducts = this.filteredData.slice(0, this.currentCount);
  }

  showMore() {
    this.showAll = true;
    this.displayedProducts = this.filteredData;
  }

  collapseList() {
    this.showAll = false;
    this.currentCount = this.productsPerPage;
    this.render();
  }

  // ==========================
  // 🔹 LỌC SẢN PHẨM
  // ==========================
  applyFilter() {
    let filtered = this.data;
    const { category, subCategory, size, price } = this.filter;

    if (category !== 'all') filtered = filtered.filter(p => p.category === category);
    if (subCategory !== 'all') filtered = filtered.filter(p => p.subCategory === subCategory);
    if (size !== 'all') filtered = filtered.filter(p => p.size === size);
    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter(p => p.gia >= min && p.gia <= (max || Infinity));
    }

    this.filteredData = filtered;
    this.collapseList();
  }


  // ==========================
  // 🧩 NHIỆM VỤ 1 — THÊM VÀO GIỎ HÀNG
  // ==========================
  addToCart(p: Product, quantity: number = 1) {
    this.cartState.addToCart({ ...p, quantity }); // dùng quantity truyền vào
    this.cartState.setHasItem(true);
    this.showToast(`✅ ${p.name} đã được thêm vào giỏ hàng!`);
  }

  // ==========================
  // 🧩 NHIỆM VỤ 2 — TOAST THÔNG BÁO
  // ==========================
  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000);
  }

  // ==========================
  // 🧩 NHIỆM VỤ 3 — MODAL CHI TIẾT SẢN PHẨM
  // ==========================
  openModal(p: Product) {
    this.selectedProduct = p;
    this.quantity = 1;
    const rating = (Math.random() * 1 + 4).toFixed(1);
    const reviews = (Math.floor(Math.random() * 2000) + 100).toLocaleString('vi-VN');
    const sold = Math.floor(Math.random() * 50) + 'k+';
    this.modalStats = `${rating}⭐ | ${reviews} Đánh giá | Đã bán ${sold}`;
  }

  closeDetail() {
    this.selectedProduct = null;
  }

  // ==========================
  // 🧩 NHIỆM VỤ 4 — THÊM TỪ MODAL CHI TIẾT
  // ==========================
  addFromDetail(event: { product: Product, quantity: number }) {
    this.cartState.addToCart({ ...event.product, quantity: event.quantity });
    this.cartState.setHasItem(true);
    this.closeDetail();
  }

  //  ////////////
  handleAddToCart(event: { product: Product, quantity: number }) {
    this.cartState.addToCart({ ...event.product, quantity: event.quantity }); //
    this.cartState.setHasItem(true);
  }

  ///
  resetFilter() {
  this.filter = { category: 'all', subCategory: 'all', size: 'all', price: 'all' };
  this.filteredData = this.data;
  this.collapseList(); // hiển thị lại mặc định (8 sản phẩm)
}
}
