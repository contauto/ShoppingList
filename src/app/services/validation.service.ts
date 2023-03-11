import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  getValidationMessage(f: any, name: string,i:number,field:any) {
    const test=f.controls[i].controls[field].errors
    if (test) {
      for (let errorName in test) {
        switch (errorName) {
          case "required":
            return name + " " + "alanı boş bırakılamaz"
          case "pattern":
            return "Bu alana sadece sayı girişi yapılabilir"
          default:
            break;
        }
      }
    }return
  }
}
