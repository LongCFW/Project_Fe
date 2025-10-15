// Footer component: hiển thị thông tin bản quyền
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {
  year = new Date().getFullYear(); // đưa ra năm hiện tại
}
