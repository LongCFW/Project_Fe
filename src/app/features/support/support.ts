// ===== Import các thư viện & module cần thiết =====
import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ===== Định nghĩa component =====
@Component({
  selector: 'app-support',
  templateUrl: './support.html',
  styleUrls: ['./support.scss'],
  imports: [CommonModule, RouterLink, FormsModule],
})
export class Support implements AfterViewInit {

  /* ==============================
     1️⃣ Các biến điều khiển UI
     ============================== */

  // Trạng thái menu mobile (mở / đóng)
  menuOpen = false;

  // Trạng thái chatbot (mở / đóng)
  chatbotOpen = false;


  /* ==============================
     2️⃣ Dữ liệu phản hồi cho Chatbot
     ============================== */
  // → responses lưu danh sách câu hỏi đơn giản và câu trả lời tương ứng
  responses: Record<string, string> = {
    "ship cod": "🚚 Shop hỗ trợ giao hàng COD trên toàn quốc.",
    "đổi trả": "🔄 Bạn có thể đổi/trả trong vòng 7 ngày.",
    "size": "👕 Bạn có thể xem bảng size chi tiết tại trang sản phẩm.",
    "màu": "🎨 Có nhiều màu, chọn ngay trong chi tiết sản phẩm.",
    "khuyến mãi": "🔥 Xem chi tiết tại trang Khuyến mãi."
  };


  /* ==============================
     3️⃣ Các hàm điều khiển giao diện
     ============================== */

  // Toggle menu mobile (mở/đóng)
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Toggle khung chatbot (mở/đóng)
  toggleChat(): void {
    this.chatbotOpen = !this.chatbotOpen;
  }


  /* ==============================
     4️⃣ Chatbot đơn giản (dùng alert)
     ============================== */
  // 👉 Gửi tin nhắn từ input vào chatbot
  sendMessage(input: HTMLInputElement): void {
    const msg = input.value.trim().toLowerCase();
    if (!msg) return; // nếu rỗng thì không làm gì
    input.value = ''; // xóa ô nhập sau khi gửi

    // Tìm phản hồi trong danh sách có sẵn
    if (this.responses[msg]) {
      alert(this.responses[msg]); // ✅ tạm hiển thị bằng alert
    } else {
      alert("❓ Xin lỗi, shop chưa hỗ trợ câu này."); // ❌ chưa có câu trả lời
    }

    // 📝 NOTE:
    // Đoạn này có thể thay alert bằng giao diện chat thật (UI hiển thị tin nhắn),
    // nếu anh muốn phát triển chatbot thực tế sau này.
  }


  /* ==============================
     5️⃣ Form liên hệ (liên hệ hỗ trợ)
     ============================== */

  // Lưu dữ liệu form (ràng buộc 2 chiều với ngModel)
  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Hàm xử lý gửi form
  submitForm(form: any): void {
    if (form.invalid) {
      // Nếu form có lỗi, đánh dấu các field chưa hợp lệ
      Object.values(form.controls).forEach((control: any) => control.markAsTouched());
      return;
    }

    // ✅ Khi form hợp lệ:
    console.log("📩 Form data:", this.formData);
    alert("✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công.");
    form.resetForm(); // reset form sau khi gửi
  }


  /* ==============================
     6️⃣ Điều chỉnh layout động (tùy theo navbar)
     ============================== */
  // 🧭 Tự động tính chiều cao navbar và đặt margin-top cho <main>
  // → Giúp fix lỗi banner bị đè ở iPad / Surface / Zenbook
  ngAfterViewInit(): void {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const height = navbar.offsetHeight + 'px';
      document.documentElement.style.setProperty('--navbar-height', height);
    }

    // Cập nhật khi thay đổi kích thước màn hình (xoay, resize)
    window.addEventListener('resize', () => {
      const nav = document.getElementById('navbar');
      if (nav) {
        const h = nav.offsetHeight + 'px';
        document.documentElement.style.setProperty('--navbar-height', h);
      }
    });
  }


  /* ==============================
     ⚠️ Ghi chú & đề xuất
     ============================== */
  // 🔸 Đoạn alert() trong chatbot và form chỉ là demo.
  //     → Nên thay bằng UI chatbox / toast message nếu cần thực tế.
  // 🔸 responses là từ điển đơn giản, có thể mở rộng thành JSON riêng.
  // 🔸 Việc tính navbar-height có thể đưa ra AppComponent nếu nhiều page cùng dùng.
}
