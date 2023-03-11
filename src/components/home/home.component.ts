import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formCounter = 0
  showDiv = false
  dummyArray = Array(0).fill(0);
  list:object[]=[]
  displayedColumns: string[] = ['position', 'name', 'count']
  constructor(private fb: FormBuilder, public validationService: ValidationService) {

  }

  form = this.fb.group({
    sepet: this.fb.array([])
  });

  addItem = () => {
    this.formCounter++
    this.dummyArray = Array(this.formCounter).fill(0);
    this.showDiv = true


    const sepetForm = this.fb.group({
      adet: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      isim: ['', Validators.required]
    });
    this.sepet.push(sepetForm);
  }

  ngOnInit() {

    this.listItems()



  }
  get sepet() {
    return this.form.controls["sepet"] as FormArray;
  }

  get getControls() {

    return this.form.controls;
  }



  addToStorage = () => {
    let urunler = []
    let adetler = []
    if (this.getControls.sepet.valid) {
      for (let index = 0; index < this.sepet.length; index++) {

        urunler[index] = this.sepet.controls[index].value.isim
        adetler[index] = this.sepet.controls[index].value.adet
      }
      localStorage.setItem('Ürünler', urunler.join())
      localStorage.setItem('Adetler', adetler.join())

      this.clear()
      this.listItems()
    }
  }

  clear = () => {
    this.formCounter = 0
    this.showDiv = false
    this.dummyArray = Array(0).fill(0);
    while (this.sepet.length !== 0) {
      this.sepet.removeAt(0)
    }
  }

  listItems=()=>{
    let urunler=localStorage.getItem("Ürünler")?.split(",")
    let adetler=localStorage.getItem("Adetler")?.split(",")
    if(urunler&&adetler){
      for (let index = 0; index < urunler.length; index++) {
        this.list.push({pozisyon:index+1,isim:urunler[index],adet:adetler[index]})
    }
  }
  }

}
