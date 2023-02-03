import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroModule } from './hero/hero.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardModule, HeroModule],
  exports: [DashboardModule, HeroModule],
})
export class FeaturesModule {}
