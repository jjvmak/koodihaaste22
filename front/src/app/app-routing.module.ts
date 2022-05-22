import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  { path: '**', component: RestaurantsComponent },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: RestaurantsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
