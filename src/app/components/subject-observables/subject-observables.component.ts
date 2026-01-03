import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject-observables',
  imports:[],
  templateUrl: './subject-observables.component.html',
  styleUrl: './subject-observables.component.scss',
})
export class SubjectObservablesComponent {
  temperatureSubject$ = new Subject<number>();
  inputTemperature = 0;
  displayTemperatureText = '';
  isCelsius = false;
  isTouched = false;

  ngOnInit() {
    this.temperatureSubject$.subscribe((temperature) => {
      if (this.isCelsius) {
        this.displayTemperatureText = temperature + '° C';
      } else {
        this.displayTemperatureText = temperature + '° F';
      }
      this.inputTemperature = temperature;
      this.isTouched = true;
    });
  }

  setTemperature() {
    const temperature = this.inputTemperature;
    this.temperatureSubject$.next(temperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
    this.isTouched = true;
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemperature - 32) * 5) / 9;
    this.temperatureSubject$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const celsiusTemperature = (this.inputTemperature * 9) / 5 + 32;
    this.temperatureSubject$.next(celsiusTemperature);
  }
}
