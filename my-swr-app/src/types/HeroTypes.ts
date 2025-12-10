export interface Hero {
  id: number;
  name: string;
  image: string;
  rarity: string;
  level: number;
  price: number;
  bid: number;
  status: string;
}

export interface LikedHeroesProps {
  hero?: Hero; 
  onClose: () => void;
}