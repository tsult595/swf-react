import styled from 'styled-components';
import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
// import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';
import { useState } from 'react';
// import ItemsDetailModal from '../../Modals/ItemsModal/ItemsDetailModal';
import ItemsDetailModal from '../../Modals/ItemsModal/ItemsDetailModal';

const MainItemCard = styled.div`
  width: 260px;
  height: 200px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(39, 43, 54, 0.8);
  border: 2px solid #ffd700;
  padding: 16px;
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    background-color: rgba(39, 43, 54, 0.9);
  }
`;

const MainItemCardUpper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  
  h2 {
    color: white;
    margin: 0 0 8px 0;
    font-size: 20px;
  }
`;

const MainItemCardLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-top: auto;
`;

const RarityBadge = styled.span<{ $rarity: string }>`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  background-color: ${props => {
    switch (props.$rarity) {
      case 'Legendary': return '#ffd700';
      case 'Epic': return '#9c27b0';
      case 'Rare': return '#2196f3';
      default: return '#4caf50';
    }
  }};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  }
`;


const MainItemInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 14px;
  width: 100%;
  height: fit-content;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  
  p {
    margin: 5px 0;
  }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>` 
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;



const MainItemsCard = ({ item, } : {item: Item} ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

//   console.log('Items data:', selectedItem);

  return (
    <>
     <MainItemCard key={item.id} onClick={() => { setSelectedItem(item); setIsModalOpen(true);}}>
              <MainItemCardUpper>
                <h2>{item.name}</h2>
              </MainItemCardUpper>
              <MainItemInfo>
                <p>{item.description}</p>
              </MainItemInfo>
              <MainItemCardLower>
                <RarityBadge $rarity={item.rarity}>{item.rarity}</RarityBadge>
              </MainItemCardLower>
            </MainItemCard>

       
        <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false); setSelectedItem(null); }}>
        <div onClick={(e) => e.stopPropagation()}>
          <ItemsDetailModal onClose={() => { setIsModalOpen(false); setSelectedItem(null); }}
          selectedItem={selectedItem} />
        </div>
      </ModalOverlay>
     </>
  )
}

export default MainItemsCard