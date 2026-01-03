import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('user-theme', this.currentTheme);
  }

  private loadTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('user-theme') as 'light' | 'dark';
      this.currentTheme = savedTheme || 'light';
      this.applyTheme(this.currentTheme);
    }
  }

  private applyTheme(theme: string) {
    const host = document.body;
    if (theme === 'dark') {
      this.renderer.addClass(host, 'dark-theme');
      this.renderer.removeClass(host, 'light-theme');
    } else {
      this.renderer.addClass(host, 'light-theme');
      this.renderer.removeClass(host, 'dark-theme');
    }
  }

  get isDark(): boolean {
    return this.currentTheme === 'dark';
  }
}
