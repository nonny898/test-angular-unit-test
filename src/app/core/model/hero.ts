import { HeroDetailInterface } from '../interface/hero.detail';

export class Hero implements HeroDetailInterface {
  id: number;
  name: string;
  power: string;
  alterEgo: string | null;

  constructor(hero: HeroDetailInterface) {
    this.id = hero.id;
    this.name = hero.name;
    this.power = hero.power;
    this.alterEgo = hero.alterEgo;
  }
}
