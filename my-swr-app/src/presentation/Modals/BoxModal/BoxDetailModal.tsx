import styled from 'styled-components';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';


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

const BoxDetails = styled.div`
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
      case 'Epic': return '#a855f7';
      case 'Rare': return '#3b82f6';
      case 'Common': return '#6b7280';
      default: return '#6b7280';
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #b8941e 100%);
  color: #232323;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(135deg, #ffe066 0%, #ffd700 100%);
  }
`;



interface BoxDetailModalProps {
  onClosee: () => void;
  selectedBox: MysteryBox | null;
}

const BoxDetailModal = ({onClosee, selectedBox}: BoxDetailModalProps) => {


  if (!selectedBox) {
    return (
      <ModalContainer>
        <Title>No Box Selected</Title>
        <CloseButton onClick={onClosee}>Close</CloseButton>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <Title>{selectedBox.name}</Title>

      <BoxDetails>
        <DetailRow>
          <Label>ID:</Label>
          <Value>{selectedBox.id}</Value>
        </DetailRow>

        <DetailRow>
          <Label>Name:</Label>
          <Value>{selectedBox.name}</Value>
        </DetailRow>

        <DetailRow>
          <Label>Rarity:</Label>
          <RarityBadge $rarity={selectedBox.rarity}>
            {selectedBox.rarity}
          </RarityBadge>
        </DetailRow>
      </BoxDetails>

      <CloseButton onClick={onClosee}>Close</CloseButton>
    </ModalContainer>
    
  );
};

export default BoxDetailModal;