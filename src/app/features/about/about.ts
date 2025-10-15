// 🔹 Import các module cần thiết từ Angular và Chart.js
import { Component, AfterViewInit } from '@angular/core'; // Component decorator và lifecycle hook
import { CommonModule } from '@angular/common';           // Module chung cho template
import { RouterLink } from '@angular/router';             // Dùng để điều hướng trong template
import { Chart } from 'chart.js/auto';                    // Thư viện Chart.js để vẽ biểu đồ

// 🔹 Khai báo Component Angular
@Component({
  selector: 'app-about',                                  // Tên selector dùng trong HTML
  imports: [CommonModule, RouterLink],                    // Các module cần thiết cho template
  templateUrl: './about.html',                            // Đường dẫn đến file HTML template
  standalone: true,                                       // Component độc lập không phụ thuộc module khác
  styleUrls: ['./about.scss']                             // Đường dẫn đến file SCSS cho style
})
export class About implements AfterViewInit {

  // 🔹 Lifecycle hook: chạy sau khi view đã render xong
  ngAfterViewInit(): void {
    // ✅ Lấy phần tử canvas từ DOM để vẽ biểu đồ
    const ctx = document.getElementById('styleChart') as HTMLCanvasElement;

    // ❗ Nếu phần tử canvas chưa tồn tại (null), đoạn dưới sẽ lỗi → nên kiểm tra null nếu cần

    // 🔹 Khởi tạo biểu đồ dạng doughnut bằng Chart.js
    new Chart(ctx, {
      type: 'doughnut', // Loại biểu đồ: hình tròn dạng donut

      // 🔸 Dữ liệu biểu đồ
      data: {
        labels: ['Tối giản', 'Casual', 'Sporty', 'Khác'], // Nhãn các phần
        datasets: [{
          label: 'Tỉ lệ (%)',                             // Nhãn cho dataset
          data: [55, 25, 15, 5],                          // Dữ liệu phần trăm
          backgroundColor: [                             // Màu nền cho từng phần
            '#212529', // đen đậm
            '#6c757d', // xám trung
            '#adb5bd', // xám nhạt
            '#dee2e6'  // rất nhạt
          ],
          borderWidth: 0,                                // Không viền
          hoverOffset: 12                                // Hiệu ứng khi hover
        }]
      },

      // 🔸 Cấu hình hiển thị biểu đồ
      options: {
        responsive: true,                                // Tự động co giãn theo kích thước
        cutout: '70%',                                   // Độ rỗng ở giữa donut

        // 🔹 Cấu hình plugin: legend và tooltip
        plugins: {
          legend: {
            position: 'bottom',                          // Vị trí chú thích
            labels: {
              color: '#111',                             // Màu chữ
              font: { size: 14, weight: 500 },           // Font chữ
              padding: 15                                // Khoảng cách giữa các mục
            }
          },
          tooltip: {
            backgroundColor: '#111',                     // Màu nền tooltip
            titleColor: '#fff',                          // Màu tiêu đề
            bodyColor: '#eee',                           // Màu nội dung
            padding: 10,                                 // Padding bên trong
            borderWidth: 1,                              // Viền tooltip
            borderColor: '#333'                          // Màu viền
          }
        }
      }
    });
  }
}