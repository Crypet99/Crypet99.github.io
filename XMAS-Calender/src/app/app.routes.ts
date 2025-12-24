import { Routes } from '@angular/router';
import { HomesComponent } from './homes/homes.component';
import { GiftsComponent } from './gifts/gifts.component';

export const routes: Routes = [
	{ path: '', component: HomesComponent },
	{ path: 'gift/:id', component: GiftsComponent },
	{ path: '**', redirectTo: '' }
];
