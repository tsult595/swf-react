export type MysteryBox = {
  id: number;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Middle' | 'High';
  price: number;
  image: string;
};