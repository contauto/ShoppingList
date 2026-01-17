import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../interfaces/item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);

  formCounter = 0;
  showForm = false;
  listArray: Item[] = [];
  displayedColumns: string[] = ['id', 'name', 'count', 'delete'];

  form = this.fb.group({
    sepet: this.fb.array([])
  });

  get sepet(): FormArray {
    return this.form.controls['sepet'] as FormArray;
  }

  ngOnInit(): void {
    this.loadItems();
  }

  addItem(): void {
    this.formCounter++;
    this.showForm = true;

    const itemForm = this.fb.group({
      adet: ['1', [Validators.required, Validators.pattern('^[0-9]*$')]],
      isim: ['', Validators.required]
    });
    this.sepet.push(itemForm);
  }

  saveItems(): void {
    if (this.form.controls.sepet.invalid) return;

    let urunler = localStorage.getItem('Ürünler')?.split(',') || [];
    let adetler = localStorage.getItem('Adetler')?.split(',') || [];

    // Clean empty arrays
    if (urunler.length === 1 && urunler[0] === '') {
      urunler = [];
      adetler = [];
    }

    const length = urunler.length;

    for (let i = 0; i < this.sepet.length; i++) {
      urunler[i + length] = this.sepet.controls[i].value.isim;
      adetler[i + length] = this.sepet.controls[i].value.adet;
    }

    localStorage.setItem('Ürünler', urunler.join());
    localStorage.setItem('Adetler', adetler.join());

    this.clearForm();
    this.loadItems();
  }

  clearForm(): void {
    this.formCounter = 0;
    this.showForm = false;
    while (this.sepet.length !== 0) {
      this.sepet.removeAt(0);
    }
  }

  deleteItem(id: number): void {
    const newList = this.listArray.filter(x => x.id !== id);

    if (newList.length > 0) {
      const urunler = newList.map(item => item.isim);
      const adetler = newList.map(item => item.adet);
      localStorage.setItem('Ürünler', urunler.join());
      localStorage.setItem('Adetler', adetler.join());
    } else {
      localStorage.removeItem('Ürünler');
      localStorage.removeItem('Adetler');
    }

    this.loadItems();
  }

  deleteAll(): void {
    localStorage.removeItem('Ürünler');
    localStorage.removeItem('Adetler');
    this.listArray = [];
  }

  private loadItems(): void {
    const urunler = localStorage.getItem('Ürünler')?.split(',');
    const adetler = localStorage.getItem('Adetler')?.split(',');

    if (urunler && adetler && urunler[0] !== '' && adetler[0] !== '') {
      this.listArray = urunler.map((isim, index) => ({
        id: index + 1,
        isim,
        adet: adetler[index]
      }));
    } else {
      this.listArray = [];
    }
  }

  getErrorMessage(index: number, field: string): string {
    const control = this.sepet.controls[index].get(field);
    if (control?.hasError('required')) {
      return this.translate.instant('validation.required', { field: field === 'isim' ? 'İsim' : 'Adet' });
    }
    if (control?.hasError('pattern')) {
      return this.translate.instant('validation.pattern');
    }
    return '';
  }
}
