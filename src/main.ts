// Entry point khởi động Angular app
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideZoneChangeDetection } from '@angular/core';
import 'zone.js';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // cung cấp router
    provideHttpClient(),   // cung cấp HttpClient (dùng nếu gọi API)
    provideZoneChangeDetection({ eventCoalescing: true })
  ],
}).catch(err => console.error(err));
