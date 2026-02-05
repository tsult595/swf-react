import styled from 'styled-components';
import { Heart } from 'lucide-react';
import type { Character } from '../../../Domain/Entities/CharacterTypes';
import LikedCharacterModal  from '../../Modals/LikedCharacterModal/LikedCharacterModal';
import { useState } from 'react';

const MainCharacterCards = styled.div`
  width: 260px;
  height: 479px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 10px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    background-color: rgba(39,43,54, 0.9);
  }
`;

const MainCharacterCardInner = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  transition: 0.3s all ease-in-out;
  padding: 16px;
`;

const MainCharacterCardUpper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  
  h2 {
    color: white;
    margin: 0;
    font-size: 20px;
  }
`;

const MainCharacterCardLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 5px 0;
    font-size: 14px;
  }
`;

const MainCharacterInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 16px;
  width: 100%;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: column;
  
  p {
    margin: 5px 0;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  background-color: ${props => props.$status === 'Active' ? '#4caf50' : '#f44336'};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px ${props => props.$status === 'Active' ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'};
  }
`;

const CharacterFrame = styled.div<{ $rarity: string }>`
  width: 230px;
  height: 350px;
  border: 25px solid transparent;
  border-image: url(${props => `/src/assets/${getFrameByRarity(props.$rarity)}`}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  overflow: hidden;
  
  ${MainCharacterCards}:hover & {
    filter: brightness(1.2);
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const getFrameByRarity = (rarity: string) => { 
  switch (rarity) {
    case 'High':
      return 'character_border_violet.png';
    case 'Middle':
      return 'character_border_blue.png';
    default:
      return 'character_border_common.png';
  }
};

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

const MainCharacterCard = ({ 
  character, 
  toggleFavorite, 
}: {
  character: Character;
  toggleFavorite: (character: Character, e?: React.MouseEvent) => Promise<void>;
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false); 
  
  
  return (
    <>
    <MainCharacterCards key={character.id} onClick={() => {setIsModalOpen(true); }}>
              <MainCharacterCardInner>
                <MainCharacterCardUpper>
                  <h2>{character.name}</h2>
                </MainCharacterCardUpper>
                <MainCharacterCardLower>
                  <p>ID: {character.id}</p>
                  <HeartButton onClick={(e) => toggleFavorite(character, e)}>
                    <Heart
                      size={20}
                      color={character.isLiked ? "red" : "#fff"}
                      fill={character.isLiked ? "red" : "none"}
                    />
                  </HeartButton>
                  <StatusBadge $status={character.status}>{character.status}</StatusBadge>
                </MainCharacterCardLower>
                <CharacterFrame $rarity={character.rarity}>
                  {character.fileName ? (
                    <CharacterImage 
                      src={`/src/assets/characterAvatars/${character.fileName}`} 
                      alt={character.name}
                      onError={(e) => {
                        console.error('Image load error:', character.fileName);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span style={{ color: 'white' }}>No Image</span>
                  )}
                </CharacterFrame>
                <MainCharacterInfo>
                  <p>Level: {character.level}</p>
                  <p>Price: {character.price} SWR</p>
                </MainCharacterInfo>
              </MainCharacterCardInner>
            </MainCharacterCards>

              <ModalOverlay $isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}> 
                    <div onClick={(e) => e.stopPropagation()}>
                      <LikedCharacterModal 
                        onClose={() => setIsModalOpen(false)}
                        character={character}
                      />
                    </div>
                  </ModalOverlay> 
              </>
  )
}

export default MainCharacterCard