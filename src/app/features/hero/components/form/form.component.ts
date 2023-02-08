import { Component, Input } from '@angular/core';
import { HeroFormInterface } from 'src/app/core/interface/hero.form';

@Component({
  selector: 'app-hero-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() powers: string[] = [];
  @Input() model!: HeroFormInterface;
  @Input() isSubmitted: boolean = false;
  @Input() handleChangeSubmitStatus!: (status: boolean) => void;
}
