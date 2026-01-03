import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

interface I_Quote {
  id: number;
  quote: string;
  author: string;
}

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
}
