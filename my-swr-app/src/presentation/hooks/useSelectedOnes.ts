import useSWR from 'swr';
import type { Character } from '../../Domain/Entities/HeroTypes';
import type { Item } from '../../Domain/Entities/enums/ItemsTypes';
import type { MysteryBox } from '../../Domain/Entities/MystoryBoxTypes';
import { useState } from 'react';

export enum MenuTab {
  Characters = 'Characters',
  Favorites = 'Favorites',
  Items = 'Items',
  Something = 'Something',
  Chat = 'Chat',
}

export const useSelectedOnes = () => {
  const [menuTab, setMenuTab] = useState(MenuTab.Characters);  
  const { data: selectedHero = null, mutate: setSelectedHero } = useSWR<Character | null>(
    'selectedHero',
    null,
    { fallbackData: null }
  );

  const { data: selectedItem = null, mutate: setSelectedItem } = useSWR<Item | null>(
    'selectedItem',
    null,
    { fallbackData: null }
  );

  const { data: selectedBox = null, mutate: setSelectedBox } = useSWR<MysteryBox | null>(
    'selectedBox',
    null,
    { fallbackData: null }
  );

  const { data: selectedRecipientId = null, mutate: setSelectedRecipientId } = useSWR<string | null>(
    'selectedRecipientId',
    null,
    { fallbackData: null }
  );

  return {
    menuTab,
    setMenuTab,
    selectedHero,
    setSelectedHero,
    selectedItem,
    setSelectedItem,
    selectedBox,
    setSelectedBox,
    selectedRecipientId,
    setSelectedRecipientId,
  };
};
