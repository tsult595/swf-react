export type MysteryBox = {
  id: number;
  ownerId: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Middle' | 'High';
  price: number;
  image: string;
};