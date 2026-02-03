import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';


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


const UserFavoritesModal = ({ selectedHero , onclose }:
{ selectedHero: Hero | null, onclose: () => void }) => {
  if (!selectedHero) return null;

  return (
    <ModalContainer>
        <Title>Hero Details</Title>
        <ItemDetails>
            <DetailRow>
                <Label>Name:</Label>
                <Value>{selectedHero.name}</Value>
            </DetailRow>
            <DetailRow>
                <Label>Rarity:</Label>
                <Value>{selectedHero.rarity}</Value>
            </DetailRow>
            <DetailRow>
                <Label>Level:</Label>
                <Value>{selectedHero.level}</Value>
            </DetailRow>
            <DetailRow>
                <Label>Price:</Label>
                <Value>{selectedHero.price}</Value>
            </DetailRow>
        </ItemDetails>
        <CloseButton onClick={onclose}>Close</CloseButton>
    </ModalContainer>
  )
}

export default UserFavoritesModal