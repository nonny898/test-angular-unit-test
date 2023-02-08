import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
