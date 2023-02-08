import { HeroListInterface } from '../interface/hero.list';
import { Hero } from '../model/hero';

const HEROES: HeroListInterface[] = [
  {
    id: 11,
    name: 'Overhold',
    power: 'Acetaminophen and Diphenhydramine HCl',
    alterEgo: 'Visual Basic',
  },
  {
    id: 12,
    name: 'Matsoft',
    power: 'Xyzal',
    alterEgo: 'ICD-9',
  },
  {
    id: 13,
    name: 'Zamit',
    power: 'NITROSTAT',
    alterEgo: 'PPO',
  },
  {
    id: 14,
    name: 'Home Ing',
    power: 'Saltbush',
    alterEgo: null,
  },
  {
    id: 15,
    name: 'Tin',
    power: 'CONDITION AND ENHANCE SYSTEM',
    alterEgo: 'Rhetorical Analysis',
  },
  {
    id: 16,
    name: 'Regrant',
    power: 'Ciprofloxacin',
    alterEgo: null,
  },
  {
    id: 17,
    name: 'Mat Lam Tam',
    power: 'Childrens Allergy Relief',
    alterEgo: null,
  },
  {
    id: 18,
    name: 'Ventosanzap',
    power: 'Indomethacin',
    alterEgo: 'NGOSS',
  },
  {
    id: 19,
    name: 'Sonsing',
    power: 'Multitrace-5',
    alterEgo: 'DNS Server',
  },
  {
    id: 20,
    name: 'Wrapsafe',
    power: 'Oxacillin',
    alterEgo: 'MVA',
  },
];

export const MOCK_HEROES: Hero[] = HEROES.map((hero) => {
  return new Hero(hero);
});
