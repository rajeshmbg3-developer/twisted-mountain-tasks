import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { APP_PATHS } from '@app/app.paths';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router) { }

  currentYear!: any;
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear()
  }

  loadUsers() {
    this.router.navigate([`${APP_PATHS.PAGES}/${APP_PATHS.USERS}`])
  }
}
