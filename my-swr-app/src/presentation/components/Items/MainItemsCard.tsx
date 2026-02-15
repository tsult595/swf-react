import styled from 'styled-components';
import type { Item } from '../../../Domain/Entities/ItemsTypes';
import { useState } from 'react';
import ItemsDetailModal from '../../Modals/ItemsModal/ItemsDetailModal';
import { ItemsPresenter } from '../..';
import { useUserId } from '../../hooks/useUserId';


const MainItemCard = styled.div<{$border : boolean}>`
  width: 290px;
  height: 350px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(39, 43, 54, 0.8);
  border: ${props => props.$border ? '2px solid #ffd700' : 'none'};
  padding: 16px;
  
 
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
 
  
 
`;


const MainItemInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 14px;
  width: 100%;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 215px;
  
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

const Button = styled.button`
  background: none; 
  border: 2px solid #ffd700;
  color: #ffd700;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: #ffd700;
    color: #232323;
  }
`;



const MainItemsCard = ({ item, mutate } : {item: Item, mutate: () => void} ) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [toggleBorderColor, setToggleBorderColor] = useState<boolean>(false);
  const userId = useUserId();
  

  return (
    <>
     <MainItemCard key={item.id} onClick={() => {setIsModalOpen(true);
    setToggleBorderColor(true); }} 
     $border={toggleBorderColor}
      >
              <MainItemCardUpper>
                <Button onClick={async (e) => {
                e.stopPropagation();
                await ItemsPresenter.buyItem(userId, item.id)
                .then(() => window.alert('Item bought successfully!')).then(() => mutate())
                .catch((err) => window.alert('Failed to buy item: ' + err.message));
              }}>Buy</Button>
              </MainItemCardUpper>
              <MainItemInfo>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </MainItemInfo>
              <MainItemCardLower>
                <RarityBadge $rarity={item.rarity}>{item.rarity}</RarityBadge>
              </MainItemCardLower>
             
            </MainItemCard>
            

       
        <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false); setToggleBorderColor(false); }}>
        <div onClick={(e) => e.stopPropagation()}>
          <ItemsDetailModal onClose={() => { setIsModalOpen(false);}}
          selectedItem={item} />
        </div>
      </ModalOverlay>
     </>
  )
}

export default MainItemsCard