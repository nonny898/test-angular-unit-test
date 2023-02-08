import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [MessagesComponent, CardComponent, TableComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MessagesComponent, CardComponent, TableComponent],
})
export class DisplayModule {}
