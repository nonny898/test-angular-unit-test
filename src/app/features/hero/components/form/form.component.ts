import { Component, Input } from '@angular/core';
import { Hero } from 'src/app/core/model/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() powers!: string[];
  @Input() model!: Hero;
}
