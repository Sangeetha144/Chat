// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'app_theme';

  setTheme(theme: string) {
    localStorage.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }

  getTheme(): string {
    return localStorage.getItem(this.themeKey) || 'default';
  }

  applyTheme(theme: string) {
    const classList = document.body.classList;
    classList.remove('default-theme', 'dark-theme');
    classList.add(`${theme}-theme`);
  }
}
