import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm DecimalPipe  // DecimalPipe
import { RouterLink } from '@angular/router';
import { CartStateService, CartItem } from '../../core/cart-state';

// ==========================================================
// 🔴 BƯỚC 1: ĐỊNH NGHĨA INTERFACE CHO SẢN PHẨM TRANG HOME
// ==========================================================
interface HomeProduct {
  id: number; // Cần ID để thêm vào giỏ hàng (CartItem)
  img: string;
  name: string;
  price: string; // Giá hiển thị ($70.00)
  gia: number; // Giá trị số cho CartStateService (ví dụ: 700000)
}

@Component({
  selector: 'app-home',
  // Thêm DecimalPipe vào imports để có thể sử dụng (nếu cần hiển thị giá số)
  imports: [CommonModule, RouterLink,], // DecimalPipe
  templateUrl: './home.html',
  standalone: true,
  styleUrls: ['./home.scss']
})
export class Home {
  // 🟢 Inject CartStateService
  constructor(private cartState: CartStateService) { }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // next and prev of loai1
  currentGroup = 0;
  cardGroups = [
    [
      { img: 'assets/images/ao_len.jpg', alt: 'Living Room', label: 'Áo Len Sweater' },
      { img: 'assets/images/khoat_jean1.jpg', alt: 'Lighting', label: 'Áo Khoác Jean' },
      { img: 'assets/images/cardigan.jpg', alt: 'Decor', label: 'Cardigan' }
    ],
    [
      { img: 'assets/images/quan_ongrong.jpg', alt: 'Decor', label: 'Quần Kaki Ống Rộng' },
      { img: 'assets/images/so_mi_tron.jpg', alt: 'Living Room', label: 'Sơ Mi Trơn' },
      { img: 'assets/images/ao_len3.jpg', alt: 'Lighting', label: 'Áo Len Cổ Tròn' }
    ],
    [
      { img: 'assets/images/quan_kaki.jpg', alt: 'Lighting', label: 'Quần Kaki Ống Suông' },
      { img: 'assets/images/so_mi_lanh.jpg', alt: 'Decor', label: 'Sơ Mi Vải Lạnh' },
      { img: 'assets/images/polo_tron.jpg', alt: 'Living Room', label: 'Áo Polo Trơn' }
    ],
    [
      { img: 'assets/images/hoodie.jpg', alt: 'Living Room', label: 'Áo Hoodie Zip Boxy' },
      { img: 'assets/images/aokhoat_kaki.jpg', alt: 'Lighting', label: 'Áo Khoác Kaki' },
      { img: 'assets/images/cardigan2.jpg', alt: 'Decor', label: 'Basic Knit Cardigan' }
    ],
    [
      { img: 'assets/images/thun_tron.jpg', alt: 'Decor', label: 'Áo Thun Boxy' },
      { img: 'assets/images/cardigan23.jpg', alt: 'Living Room', label: 'V-neck Cardigan' },
      { img: 'assets/images/khoat_jean2.jpg', alt: 'Lighting', label: 'Casual Denim Jacket' }
    ]
  ];

  prevGroup() {
    this.currentGroup = (this.currentGroup - 1 + this.cardGroups.length) % this.cardGroups.length;
  }

  nextGroup() {
    this.currentGroup = (this.currentGroup + 1) % this.cardGroups.length;
  }

  // showMore best seller
  showMore = false;

  // 🟢 CẬP NHẬT: Thêm id và gia (Giá trị giả định)
  defaultProducts: HomeProduct[] = [
    { id: 101, img: 'assets/images/item_sanpham.jpg', name: 'Street Gentleman', price: '$70.00', gia: 700000 },
    { id: 102, img: 'assets/images/item_sanpham2.jpg', name: 'Casual Fresh', price: '$70.00', gia: 700000 },
    { id: 103, img: 'assets/images/item_sanpham2_3.jpg', name: 'Urban Minimal', price: '$70.00', gia: 700000 },
    { id: 104, img: 'assets/images/item_sanpham2_5.jpg', name: 'Vintage Scholar', price: '$70.00', gia: 700000 }
  ];

  // 🟢 CẬP NHẬT: Thêm id và gia (Giá trị giả định)
  moreProducts: HomeProduct[] = [
    { id: 105, img: 'assets/images/item_sanpham.jpg', name: 'Extra Item 1', price: '$80.00', gia: 800000 },
    { id: 106, img: 'assets/images/item_sanpham2.jpg', name: 'Extra Item 2', price: '$65.00', gia: 650000 },
    { id: 107, img: 'assets/images/item_sanpham2_3.jpg', name: 'Extra Item 3', price: '$75.00', gia: 750000 },
    { id: 108, img: 'assets/images/item_sanpham2_5.jpg', name: 'Extra Item 4', price: '$60.00', gia: 600000 },
    { id: 109, img: 'assets/images/item_sanpham.jpg', name: 'Extra Item 5', price: '$80.00', gia: 800000 },
    { id: 110, img: 'assets/images/item_sanpham2.jpg', name: 'Extra Item 6', price: '$65.00', gia: 650000 },
    { id: 111, img: 'assets/images/item_sanpham2_3.jpg', name: 'Extra Item 7', price: '$75.00', gia: 750000 },
    { id: 112, img: 'assets/images/item_sanpham2_5.jpg', name: 'Extra Item 8', price: '$60.00', gia: 600000 },
    { id: 113, img: 'assets/images/item_sanpham.jpg', name: 'Extra Item 9', price: '$80.00', gia: 800000 },
    { id: 114, img: 'assets/images/item_sanpham2.jpg', name: 'Extra Item 10', price: '$65.00', gia: 650000 },
    { id: 115, img: 'assets/images/item_sanpham2_3.jpg', name: 'Extra Item 11', price: '$75.00', gia: 750000 },
    { id: 116, img: 'assets/images/item_sanpham2_5.jpg', name: 'Extra Item 12', price: '$60.00', gia: 600000 }
  ];

  toggleMore(fromBottom: boolean = false) {
    this.showMore = !this.showMore;

    if (this.showMore) {
      setTimeout(() => {
        document.querySelector('.extra-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } else {
      const target = fromBottom
        ? document.querySelector('.title_best_seller')
        : null;
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // showMore New_Arrivals
  show = false;

  // 🟢 CẬP NHẬT: Thêm id và gia (Giá trị giả định, dùng ID khác để tránh trùng lặp)
  default: HomeProduct[] = [
    { id: 201, img: 'assets/images/item_sanpham.jpg', name: 'Street Gentleman', price: '$70.00', gia: 700000 },
    { id: 202, img: 'assets/images/item_sanpham2.jpg', name: 'Casual Fresh', price: '$70.00', gia: 700000 },
    { id: 203, img: 'assets/images/item_sanpham2_3.jpg', name: 'Urban Minimal', price: '$70.00', gia: 700000 },
    { id: 204, img: 'assets/images/item_sanpham2_5.jpg', name: 'Vintage Scholar', price: '$70.00', gia: 700000 }
  ];

  // 🟢 CẬP NHẬT: Thêm id và gia (Giá trị giả định)
  more: HomeProduct[] = [
    { id: 205, img: 'assets/images/item_sanpham.jpg', name: 'Extra Item 1', price: '$80.00', gia: 800000 },
    { id: 206, img: 'assets/images/item_sanpham2.jpg', name: 'Extra Item 2', price: '$65.00', gia: 650000 },
    { id: 207, img: 'assets/images/item_sanpham2_3.jpg', name: 'Extra Item 3', price: '$75.00', gia: 750000 },
    { id: 208, img: 'assets/images/item_sanpham2_5.jpg', name: 'Extra Item 4', price: '$60.00', gia: 600000 },
    { id: 209, img: 'assets/images/item_sanpham.jpg', name: 'Extra Item 5', price: '$80.00', gia: 800000 },
    { id: 210, img: 'assets/images/item_sanpham2.jpg', name: 'Extra Item 6', price: '$65.00', gia: 650000 },
    { id: 211, img: 'assets/images/item_sanpham2_3.jpg', name: 'Extra Item 7', price: '$75.00', gia: 750000 },
    { id: 212, img: 'assets/images/item_sanpham2_5.jpg', name: 'Extra Item 8', price: '$60.00', gia: 600000 }
  ];

  toggleMoreNew_Arrivals(fromBottom: boolean = false) {
    this.show = !this.show;

    if (this.show) {
      setTimeout(() => {
        document.querySelector('.extra-list_V2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } else {
      const target = fromBottom
        ? document.querySelector('.title_best_seller')
        : null;
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // next and prev of recommand (giữ nguyên, không liên quan đến giỏ hàng)
  currentTestimonial = 0;

  testimonialGroups = [
    [
      {
        img: 'assets/images/avatar like.png',
        text: '“Áo sơ mi chất lượng, đường may đẹp. Giao hàng nhanh chóng.”',
        name: 'Nguyễn Văn A'
      },
      {
        img: 'assets/images/creator-image.png',
        text: '“Phong cách tối giản nhưng rất tinh tế. Rất hợp gu Hàn Quốc.”',
        name: 'Trần Minh B'
      },
      {
        img: 'assets/images/Avatar Placeholder (5).png',
        text: '“Giá hợp lý, dịch vụ chăm sóc khách hàng tận tình. Sẽ mua lại.”',
        name: 'Phạm Quốc C'
      }
    ],
    [
      {
        img: 'assets/images/avatar like.png',
        text: '“Thiết kế đẹp, chất liệu thoáng mát. Rất đáng tiền.”',
        name: 'Nguyễn Văn D'
      },
      {
        img: 'assets/images/creator-image.png',
        text: '“Mua lần 2 rồi, vẫn hài lòng như lần đầu tiên.”',
        name: 'Trần Minh E'
      },
      {
        img: 'assets/images/Avatar Placeholder (5).png',
        text: '“Đóng gói cẩn thận, ship nhanh.”',
        name: 'Phạm Quốc F'
      }
    ],
    [
      {
        img: 'assets/images/avatar like.png',
        text: '“Sản phẩm y hình, tư vấn nhiệt tình. Sẽ ủng hộ lâu dài.”',
        name: 'Nguyễn Văn G'
      },
      {
        img: 'assets/images/creator-image.png',
        text: '“Giá cả hợp lý, nhiều mẫu mã đẹp để lựa chọn.”',
        name: 'Trần Minh H'
      },
      {
        img: 'assets/images/Avatar Placeholder (5).png',
        text: '“Đặt hàng dễ dàng, thanh toán nhanh chóng.”',
        name: 'Phạm Quốc I'
      }
    ]
  ];


  prevTestimonial() {
    this.currentTestimonial =
      (this.currentTestimonial - 1 + this.testimonialGroups.length) %
      this.testimonialGroups.length;
  }

  nextTestimonial() {
    this.currentTestimonial =
      (this.currentTestimonial + 1) % this.testimonialGroups.length;
  }

  // ==========================================================
  // 🟢 BƯỚC 3: HÀM ADD TO CART ĐÃ SỬA VÀ HOÀN THIỆN
  // ==========================================================
  addToCart(item: HomeProduct, qty: number = 1) {
    // 1. Tạo đối tượng CartItem từ HomeProduct
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      img: item.img,
      gia: item.gia,
      quantity: qty, // Quantity sẽ được xử lý trong Service
    };

    // 2. Gọi hàm addToCart. Service sẽ lo phần cập nhật Navbar (dấu dot đỏ)
    this.cartState.addToCart(cartItem); // Thêm 1 sản phẩm

    this.showToast(`${item.name} đã được thêm vào giỏ hàng!`);
  }

  toastMessage: string | null = null;

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = null, 3000); // 3 giây tự ẩn
  }

}