import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { ListComponent } from './pages/list/list.component';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './pages/detail/detail.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    CreateComponent,
    EditComponent,
    FormComponent,
  ],
  imports: [CommonModule, HeroRoutingModule, FormsModule],
})
export class HeroModule {}
