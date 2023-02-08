import { HeroInterface } from './hero.main';

export interface HeroFormInterface extends HeroInterface {
  id: number | null;
}
