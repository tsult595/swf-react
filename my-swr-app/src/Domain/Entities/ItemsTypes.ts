export type Item = {
  id: number;
  ownerId: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
};