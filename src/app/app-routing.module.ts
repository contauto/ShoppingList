import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './../components/about/about.component';
import { MainComponent } from './../layouts/main/main.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  component: MainComponent,
  children: [{
    path: "",
    component: HomeComponent
  }, {
    path: "about",
    component: AboutComponent
  }]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
