import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../app/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private router = inject(Router);
  themeService = inject(ThemeService);
  translate = inject(TranslateService);

  isMenuOpen = false;
  isLangDropdownOpen = false;

  get currentLang(): string {
    return this.translate.currentLang || 'tr';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLangDropdown(): void {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('shopping-list-lang', lang);
    this.isLangDropdownOpen = false;
  }

  navigateHome(): void {
    this.router.navigateByUrl('/');
    this.closeMenu();
  }

  navigateAbout(): void {
    this.router.navigateByUrl('/about');
    this.closeMenu();
  }
}
