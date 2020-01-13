import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SessionResolver} from '@app/resolvers/session/session.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: `./client/client.module#ClientModule`,
    resolve: {session: SessionResolver}
  },
  {
    path: 'admin',
    loadChildren: `./restaurant/restaurant.module#RestaurantModule`
  },
  {
    path: 'plan',
    loadChildren: './client-plan/client-plan.module#ClientPlanModule'
  },
  {
    path: '**',
    redirectTo: '/admin/plan'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {
}
