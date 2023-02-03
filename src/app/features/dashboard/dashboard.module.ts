import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
