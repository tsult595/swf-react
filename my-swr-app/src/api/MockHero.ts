import imgOne from '../assets/download (1).jpg';
import imgTwo from '../assets/download.jpg';
import imgThree from '../assets/images (1).jpg';
import imgFour from '../assets/images (2).jpg';
import imgFive from '../assets/images (3).jpg';
import imgSix from '../assets/download.jpg';
import type { Hero } from '../types/HeroTypes';

export const HeroApi: Hero[] = [
  {
    id: 1,
    name: 'Dragon Mageq',
    image: imgOne,
    rarity: 'High',
    level: 30,
    price: 300,
    bid: 75,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Dragon Magess',
    rarity: 'Common',
    image: imgTwo,
    level: 30,
    price: 300,
    bid: 75,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dragon Magek',
    image: imgThree,
    rarity: 'Common',
    level: 30,
    price: 300,
    bid: 75,
    status: 'Cancelled'
  },
  {
    id: 4,
    name: 'Dragon Mage',
    rarity: 'Middle',
    image: imgFour,
    level: 30,
    price: 300,
    bid: 75,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Dragon Mage',
    rarity: 'Middle',
    image: imgFive,
    level: 30,
    price: 300,
    bid: 75,
    status: 'Cancelled'
  },
  {
    id: 6,
    name: 'Goblin Rogue',
    rarity: 'Common',
    image: imgSix,
    level: 15, 
    price: 120,
    bid: 50,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Goblin Rogue',
    rarity: 'High',
    image: imgOne,
    level: 20, 
    price: 120,
    bid: 50,
    status: 'Active'
  }
];