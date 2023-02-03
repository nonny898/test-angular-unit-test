import { Component } from '@angular/core';
import { Hero } from 'src/app/core/model/hero';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];

  model = new Hero({
    id: null,
    name: '',
    power: '',
    alterEgo: '',
  });

  isSubmitted = false;

  handleSubmit() {
    this.isSubmitted = true;
  }

  handleChangeSubmitStatus(status: boolean) {
    console.log(
      '🚀 ~ CreateComponent ~ handleChangeSubmitStatus ~ status',
      status
    );
    this.isSubmitted = status;
  }
}
