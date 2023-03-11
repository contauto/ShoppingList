import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  year:number=Number((new Date()).getFullYear())
  constructor() { }

  ngOnInit() {
  }

}
