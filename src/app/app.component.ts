import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubjectObservablesComponent } from './components/subject-observables/subject-observables.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule,SubjectObservablesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
}
