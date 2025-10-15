// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// If the module exports a default component, use:
// import { Navbar } from './shared/navbar/navbar';
// Or, if the correct export is named differently (e.g., NavbarComponent), use:
import { NavbarComponent } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, Footer],
  template: `
    <app-navbar></app-navbar>

    <!-- App-level main: chỉ 1 main duy nhất -->
    <main class="container-fluid p-0">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
})
export class App {}
