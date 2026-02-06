import styled, { css } from 'styled-components';
import SocialsFrameHover from '../../../assets/small_button_hover.png';
import SocialFrameActive from '../../../assets/small_button_pressed.png';
import characterFrame from '../../../assets/character_border_common.png';
import characterFrameHigh from '../../../assets/character_border_violet.png';
import characterFrameMiddle from '../../../assets/character_border_blue.png';
import { Heart } from 'lucide-react';
import { FavoritePresenter, CharactersPresenter } from '../..';
import type { Character } from '../../../Domain/Entities/CharacterTypes';
import { useUserId } from '../../hooks/useUserId';




const FrameBorderModalMain = css`
  border-style: solid;
  border-image-width: 33px;
  border-image-source: url('/assets/frame_16_background.png');
  border-image-slice: 33 fill;
  border-image-repeat: round;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  width: 800px;
  max-height: 80vh; 
  display: flex;
  flex-direction: column;
  ${FrameBorderModalMain}
`;

const Header = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: white;
  margin: 0; 
  text-align: center;
`;

const CharacterCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
  padding: 10px;
  
  &::-webkit-scrollbar {
    width: 15px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    
    &:hover {
      background: linear-gradient(180deg, #764ba2 0%, #667eea 100%);
    }
  }
`;

const CharacterCard = styled.div`
  background: #2a2a2a;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 75%;
  display: flex; 
  gap: 15px;
  align-items: center;
  transition: transform 0.2s; 
  ${FrameBorderModalMain}
  
  &:hover {
    transform: scale(1.02);
    background: #333;
  }
`;

const getFrameByRarity = (rarity: string) => { 
  switch (rarity) {
    case 'High':
      return characterFrameHigh;
    case 'Middle':
      return characterFrameMiddle;
    default:
      return characterFrame;
  }
};

const CharacterFrame = styled.div<{ $rarity: string }>`
  width: 230px;
  height: 308px;
  margin-left: 11px;
  border: 13px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  overflow: hidden; 
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; 
`;

const CharacterInfo = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
  
  h3 {
    color: white;
    margin: 0;
    font-size: 18px;
  }
  
  p {
    color: #888;
    font-size: 14px;
    margin: 0;
    
    &:first-of-type {
      color: #aaa;
    }
  }
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${SocialsFrameHover});
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none; 
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    transform: scale(1.1);
    background-image: url(${SocialFrameActive});
  }
  
  &:active {
    transform: translateY(2px);
    background-image: url(${SocialFrameActive});
  }
`;

const EmptyMessage = styled.p` 
  color: #888;
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

`;

export interface FavoriteCharactersProps {
  onClose: () => void;
}


const FavoriteCharacters = ({ onClose }: FavoriteCharactersProps) => {
  const userId = useUserId();
  const { data: characters, isLoading, mutate } = CharactersPresenter.useGetAllCharacters(userId);
  const favoriteCharacters = characters?.filter(character => character.isLiked) || [];

  const toggleFavorite = async (character: Character) => {
    const newIsLiked = !character.isLiked;
   
    mutate(
      (currentCharacters) =>
        currentCharacters?.map((c) =>
          c.id === character.id ? { ...c, isLiked: newIsLiked } : c
        ),
      false
    );

    try {
      await FavoritePresenter.toggleFavorites(userId, character.id, character.isLiked || false);
     
    } catch (error) {
      // Откат при ошибке
      mutate();
      
      console.error('Failed to toggle favorite:', error);
    }
  };


  const favoritesList = favoriteCharacters;

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>Favorite Characters</Title>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>
        <EmptyMessage>Loading favorites...</EmptyMessage>
      </Container>
    );
  }

  if (favoritesList.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Favorite Characters</Title>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>
        <EmptyMessage>No favorite characters yet. Click ❤️ to add</EmptyMessage>
      </Container>
    );
  }

  return (
    <>
   
    <Container>
      <Header>
        <Title>Favorite Characters ({favoritesList.length})</Title>
        <CloseButton onClick={onClose}>✖</CloseButton>
      </Header>

      <CharacterCardWrapper>
        {favoritesList.map((character: Character) => (
          <CharacterCard key={character.id}>
            <CharacterFrame $rarity={character.rarity}>
              <CharacterImage
                src={`/src/assets/characterAvatars/${character.fileName}`}
                alt={character.name}
              />
            </CharacterFrame>

            <CharacterInfo>
              <HeartButton onClick={() => toggleFavorite(character)}>
                <Heart
                  size={20}
                  color={character.isLiked ? "red" : "#fff"}
                  fill={character.isLiked ? "red" : "none"}
                />
              </HeartButton>

              <h3>{character.name}</h3>
              <p>Level: {character.level}</p>
              <p>Rarity: {character.rarity}</p>
              <p>Price: {character.price}</p>
            </CharacterInfo>
          </CharacterCard>
        ))}
      </CharacterCardWrapper>
    </Container>
   
   </>
  );
};


export default FavoriteCharacters ;

