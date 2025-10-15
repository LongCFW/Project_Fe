// Định nghĩa các route chính của ứng dụng
import { Routes } from '@angular/router';

// Import các component cho router
import { ProductList } from './features/products/product-list/product-list';
import { ProductDetail } from './features/products/product-detail/product-detail';
import { CartComponent } from './features/cart/cart/cart';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Support } from './features/support/support';
import { User } from './features/user/user';

export const routes: Routes = [
  { path: '', component: Home },             // Home (default)
  { path: 'products', component: ProductList },   // products -> ProductList
  { path: 'product/:id', component: ProductDetail }, // product/123 -> ProductDetail
  { path: 'cart', component: CartComponent },       // cart -> Cart
  { path: 'about', component: About }, // about
  { path: 'support', component: Support },
  { path: 'user', component: User },
  { path: '**', redirectTo: '' },                     // fallback: không match thì về Home
];
