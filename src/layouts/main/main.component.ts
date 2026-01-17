import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, NavbarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private translate = inject(TranslateService);

  ngOnInit(): void {
    // Initialize language
    const savedLang = localStorage.getItem('shopping-list-lang');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }
}
