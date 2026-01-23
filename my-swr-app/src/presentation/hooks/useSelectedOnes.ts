import useSWR from 'swr';
import type { Hero } from '../../Domain/Entities/HeroTypes';
import type { Item } from '../../Domain/Entities/enums/ItemsTypes';
import type { MysteryBox } from '../../Domain/Entities/MystoryBoxTypes';

export const useSelectedOnes = () => {
  const { data: selectedHero, mutate: setSelectedHero } = useSWR<Hero | null>(
    'selectedHero',
    null,
    { fallbackData: null }
  );

  const { data: selectedItem, mutate: setSelectedItem } = useSWR<Item | null>(
    'selectedItem',
    null,
    { fallbackData: null }
  );

  const { data: selectedBox, mutate: setSelectedBox } = useSWR<MysteryBox | null>(
    'selectedBox',
    null,
    { fallbackData: null }
  );

  return {
    selectedHero,
    setSelectedHero,
    selectedItem,
    setSelectedItem,
    selectedBox,
    setSelectedBox,
  };
};
