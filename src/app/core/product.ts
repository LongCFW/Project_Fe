// Đây là service và interface quản lý dữ liệu sản phẩm
// File này cung cấp Product interface và ProductService để các component khác dùng
import { Injectable } from '@angular/core';
// Interface mô tả 1 sản phẩm
export interface Product {
  id: number;
  name: string;
  img: string;
  gia: number;
  category: 'ao' | 'quan';
}
@Injectable({
  providedIn: 'root', // service dùng toàn cục
})
export class ProductService {
  // Fake data sản phẩm (bạn thay ảnh trong assets/images)
  private products: Product[] = [
    { id: 1, name: 'áo thun đen trơn boxy', img: 'assets/images/thun_tron.jpg', gia: 581000, category: 'ao' },
    { id: 2, name: 'áo len lông nỉ', img: 'assets/images/ao_len.jpg', gia: 456000, category: 'ao' },
    { id: 3, name: 'áo len cao cổ', img: 'assets/images/ao_len1.jpg', gia: 511000, category: 'ao' },
    { id: 4, name: 'áo len cổ tròn', img: 'assets/images/ao_len3.jpg', gia: 234000, category: 'ao' },
    { id: 5, name: 'Collared Cardigan', img: 'assets/images/cardigan4.jpg', gia: 735000, category: 'ao' },
    { id: 6, name: 'V-neck Cardigan', img: 'assets/images/cardigan23.jpg', gia: 227000, category: 'ao' },
    { id: 7, name: 'Shawl Collar Cardigan', img: 'assets/images/cardigan.jpg', gia: 208000, category: 'ao' },
    { id: 8, name: 'Oversized V-neck Cardigan', img: 'assets/images/cardigan1.jpg', gia: 207000, category: 'ao' },
    { id: 9, name: 'Basic Knit Cardigan', img: 'assets/images/cardigan2.jpg', gia: 826000, category: 'ao' },
    { id: 10, name: 'jean ống rộng', img: 'assets/images/jean_ongrong.jpg', gia: 265000, category: 'quan' },
    { id: 11, name: 'jean ống xuông', img: 'assets/images/jean_ongxuong.jpg', gia: 311000, category: 'quan' },
    { id: 12, name: 'Trucker Jacket', img: 'assets/images/khoat_jean.jpg', gia: 554000, category: 'ao' },
    { id: 13, name: 'Denim Shirt Jacket', img: 'assets/images/khoat_jean1.jpg', gia: 995000, category: 'ao' },
    { id: 14, name: 'Casual Denim Jacket', img: 'assets/images/khoat_jean2.jpg', gia: 905000, category: 'ao' },
    { id: 15, name: 'kaki ống suông', img: 'assets/images/quan_kaki.jpg', gia: 839000, category: 'quan' },
    { id: 16, name: 'sơ mi vải lanh', img: 'assets/images/so_mi_lanh.jpg', gia: 168000, category: 'ao' },
    { id: 17, name: 'Casual Shirt', img: 'assets/images/so_mi.jpg', gia: 505000, category: 'ao' },
    { id: 18, name: 'sơ mi trơn', img: 'assets/images/so_mi_tron.jpg', gia: 249000, category: 'ao' },
    { id: 19, name: 'áo thun trắng trơn boxy', img: 'assets/images/thun_tron(t).jpg', gia: 965000, category: 'ao' },
    { id: 20, name: 'áo khoát da boxy', img: 'assets/images/khoat_da_boxy.jpg', gia: 994000, category: 'ao' },
    { id: 21, name: 'áo polo trơn', img: 'assets/images/polo_tron.jpg', gia: 804000, category: 'ao' },
    { id: 22, name: 'quần kaki xếp ly ống rộng', img: 'assets/images/quan_kaki_suong.jpg', gia: 556000, category: 'quan' },
    { id: 23, name: 'quần kaki ống rộng', img: 'assets/images/quan_ongrong.jpg', gia: 516000, category: 'quan' },
    { id: 24, name: 'áo hoodie zip boxy', img: 'assets/images/hoodie.jpg', gia: 334000, category: 'ao' },
    { id: 25, name: 'áo len unisex', img: 'assets/images/aolen_unisex.jpg', gia: 870000, category: 'ao' },
    { id: 26, name: 'áo khoát kaki', img: 'assets/images/aokhoat_kaki.jpg', gia: 712000, category: 'ao' },
    { id: 27, name: 'áo khoát kaki', img: 'assets/images/aokhoat_kaki.jpg', gia: 712000, category: 'ao' },  ];
  // Lấy tất cả sản phẩm
  getProducts(): Product[] {
    return this.products;
  }
  // Lấy chi tiết sản phẩm theo id
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}