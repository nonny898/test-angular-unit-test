import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './features/dashboard/dashboard-routing.module';
import { HeroRoutingModule } from './features/hero/hero-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardRoutingModule,
    HeroRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
