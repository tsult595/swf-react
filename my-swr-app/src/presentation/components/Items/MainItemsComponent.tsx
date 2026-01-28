import styled from 'styled-components';
import { ItemsPresenter } from '../..';
import ItemsDetailModal from '../../Modals/ItemsModal/ItemsDetailModal';
import { useState } from 'react';
import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
import MainItemsCard from './MainItemsCard';

const MainItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 30px;
  gap: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 40px;
`;




const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  color: #ff4757;
  font-size: 18px;
  gap: 10px;
  
  button {
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background: #764ba2;
    }
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

interface MainItemsComponentProps {
  text ?: string;

}

const MainItemsComponent = ({ text  }: MainItemsComponentProps) => {
  const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  console.log('Items data:', selectedItem);

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <div>Loading items...</div>
        </LoadingWrapper>
      )}

      {error && (
        <ErrorWrapper>
          <div>❌ Failed to load items</div>
          <button onClick={() => mutate()}>Retry</button>
        </ErrorWrapper>
      )}

      {!isLoading && !error && items && (
        <MainItemsWrapper>
          {items.map((item) => (
            <MainItemsCard text={text ?? ''} item={item} setSelectedItem={setSelectedItem} />
          ))}
        </MainItemsWrapper>
      )}

        <ModalOverlay $isOpen={selectedItem !== null} onClick={() => setSelectedItem(null)}>
        <div onClick={(e) => e.stopPropagation()}>
          <ItemsDetailModal onClose={() => setSelectedItem(null)}
          selectedItem={selectedItem} />
        </div>
      </ModalOverlay>
    </>
  );
};

export default MainItemsComponent;