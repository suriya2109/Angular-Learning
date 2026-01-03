import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ObservablesComponent } from './pages/observables/observables.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    
    {path:"observables", component:ObservablesComponent}
];
