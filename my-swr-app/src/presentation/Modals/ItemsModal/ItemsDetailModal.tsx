import styled from 'styled-components';

import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';


const ModalContainer = styled.div`
  background: #232323;
  border-radius: 16px;
  padding: 32px;
  min-width: 400px;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: white;
`;

const Title = styled.h2`
  color: #ffd700;
  margin: 0;
  font-size: 1.8rem;
  text-align: center;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-weight: bold;
  color: #ffd700;
`;

const Value = styled.span`
  color: rgba(255, 255, 255, 0.9);
`;

const RarityBadge = styled.span<{ $rarity: string }>`
  padding: 6px 12px;
  background-color: ${props => {
    switch (props.$rarity) {
      case 'Legendary': return '#ffd700';
      case 'Epic': return '#9c27b0';
      case 'Rare': return '#2196f3';
      default: return '#4caf50';
    }
  }};
  border-radius: 6px;
  color: white;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: #444;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;
  transition: background 0.2s;
  
  &:hover {
    background: #666;
  }
`;

const ErrorText = styled.div`
  text-align: center;
  color: #ff4757;
  font-size: 1.2rem;
`;

interface ItemsDetailModalProps {
  onClose: () => void;
  selectedItem?: Item | null;
}

const ItemsDetailModal = ({ onClose, selectedItem }: ItemsDetailModalProps) => {
 

  if (!selectedItem) {
    return (
      <ModalContainer>
        <Title>Item Details</Title>
        <ErrorText>No item selected</ErrorText>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <Title>Item Details</Title>
      
      <ItemDetails>
        <DetailRow>
          <Label>Name:</Label>
          <Value>{selectedItem.name}</Value>
        </DetailRow>
        <DetailRow>
          <Label>ID:</Label>
          <Value>{selectedItem.id}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Description:</Label>
          <Value>{selectedItem.description}</Value>
        </DetailRow>
        <DetailRow>
          <Label>Rarity:</Label>
          <RarityBadge $rarity={selectedItem.rarity}>{selectedItem.rarity}</RarityBadge>
        </DetailRow>
      </ItemDetails>
      
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ModalContainer>
  );
};

export default ItemsDetailModal;