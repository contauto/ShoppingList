import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly STORAGE_KEY = 'shopping-list-theme';

    theme = signal<Theme>(this.getInitialTheme());

    constructor() {
        effect(() => {
            const currentTheme = this.theme();
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem(this.STORAGE_KEY, currentTheme);
        });
    }

    private getInitialTheme(): Theme {
        const stored = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
        if (stored) return stored;

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    toggleTheme(): void {
        this.theme.update(current => current === 'light' ? 'dark' : 'light');
    }

    isDark(): boolean {
        return this.theme() === 'dark';
    }
}
