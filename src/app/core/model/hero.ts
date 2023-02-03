import { HeroFormInterface } from '../interface/hero.form';

export class Hero implements HeroFormInterface {
  id: number | null;
  name: string;
  power: string;
  alterEgo?: string;

  constructor(hero: HeroFormInterface) {
    this.id = hero.id;
    this.name = hero.name;
    this.power = hero.power;
    this.alterEgo = hero.alterEgo;
  }
}
