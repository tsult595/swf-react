export interface Hero {
  id: number;
  name: string;
  fileName: string;
  rarity: string;
  level: number;
  price: number;
  bid: number;
  status: string;
}

export interface LikedHeroesProps {
  hero: Hero; 
  onClose: () => void;
}

export interface FavoriteHeroesProps {
  heroes: Hero[];
  onClose: () => void;
}

export interface ClosingProps {
    onClose: () => void;
}