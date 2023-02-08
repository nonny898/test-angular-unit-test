import { Component } from '@angular/core';
import { HeroFormInterface } from 'src/app/core/interface/hero.form';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model: HeroFormInterface = {
    id: null,
    name: '',
    power: '',
    alterEgo: '',
  };

  isSubmitted = false;

  handleChangeSubmitStatus(status: boolean) {
    this.isSubmitted = status;
  }
}
