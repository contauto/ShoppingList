import { Item } from './../../interfaces/item';
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
  listArray: Item[] = []
  list: Item[] = []
  displayedColumns: string[] = ['id', 'name', 'count', "delete"]
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


  deleteAll = () => {
    this.list = []
    this.listArray = [...this.list]
    localStorage.clear()
  }

  delete = (id: any) => {
    let newList: Item[] = []
    let urunler = []
    let adetler = []
    newList = this.listArray.filter(x => x.id !== id)
    this.list = []
    for (let index = 0; index < newList.length; index++) {
      this.list.push({ id: index + 1, isim: newList[index].isim, adet: newList[index].adet })
      urunler[index] = newList[index].isim
      adetler[index] = newList[index].adet
    }
    if (urunler.length>0) {
      localStorage.setItem('Ürünler', urunler!.join())
      localStorage.setItem('Adetler', adetler!.join())
    }
    else { localStorage.clear() }
    this.listArray = [...this.list]
  }


  addToStorage = () => {

    let urunler = localStorage.getItem("Ürünler")?.split(",")
    let adetler = localStorage.getItem("Adetler")?.split(",")
    let length = urunler?.length
    if (length === undefined) {
      length = 0
      urunler = []
      adetler = []
    }
    if(urunler&&urunler[0]===""){
      urunler=[]
      adetler=[]
    }
    if (this.getControls.sepet.valid) {
      for (let index = 0; index < this.sepet.length; index++) {

        urunler![index + length!] = this.sepet.controls[index].value.isim
        adetler![index + length!] = this.sepet.controls[index].value.adet
      }
      localStorage.setItem('Ürünler', urunler!.join())
      localStorage.setItem('Adetler', adetler!.join())
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

  listItems = () => {
    let urunler = localStorage.getItem("Ürünler")?.split(",")
    let adetler = localStorage.getItem("Adetler")?.split(",")
    if (urunler && adetler) {
      if (urunler[0] !== "" && adetler[0] !== "") {
        this.list = []
        for (let index = 0; index < urunler.length; index++) {


          { this.list.push({ id: index + 1, isim: urunler[index], adet: adetler[index] }) }
        }
      }
    }
    this.listArray = [...this.list]
  }


}
