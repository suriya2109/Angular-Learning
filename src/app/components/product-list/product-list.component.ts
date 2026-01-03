import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

const showman_image = "./assets/images/snowman.jpg";
const sun_image = "./assets/images/sun.jpg";

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  inputTemperature = 0;
  imageSrc = sun_image;
  temperatureSubjuct$ = new BehaviorSubject<number>(72);

  ngOnInit(){
    this.temperatureSubjuct$.subscribe((temperature) =>{
        if(temperature >= 40){
          this.imageSrc = sun_image;
        }else{
          this.imageSrc = showman_image;
        }
    })
  }

  handle_setTemperature(){
    this.temperatureSubjuct$.next(this.inputTemperature);
  }

  handle_setInputTemperature(event:any){
    const inputVal = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(inputVal);
  }
}
