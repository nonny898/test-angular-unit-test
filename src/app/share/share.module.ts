import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayModule } from './component/display/display.module';
import { InputModule } from './component/input/input.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DisplayModule, InputModule],
  exports: [DisplayModule, InputModule],
})
export class ShareModule {}
