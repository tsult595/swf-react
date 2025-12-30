import styled, { css } from 'styled-components';
import type { FavoriteHeroesProps} from '../../../Domain/Entities/HeroTypes';
import SocialsFrameHover from '../../../assets/small_button_hover.png';
import SocialFrameActive from '../../../assets/small_button_pressed.png';
import heroFrame from '../../../assets/character_border_common.png'; 
import heroFrameHigh from '../../../assets/character_border_violet.png'; 
import heroFrameMiddle from '../../../assets/character_border_blue.png'; 
import { Heart } from 'lucide-react';

// import { useFavorites } from '../../hooks/useFavorites';

import { FavoritePresenter } from '../..';
import { useCallback } from 'react';


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

const HeroCardWrapper = styled.div`
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

const HeroCard = styled.div`
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
      return heroFrameHigh;
    case 'Middle':
      return heroFrameMiddle;
    default:
      return heroFrame;
  }
};

const HeroFrame = styled.div<{ $rarity: string }>`
  width: 230px;
  height: 308px;
  margin-left: 11px;
  border: 13px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  overflow: hidden; /* 👈 Добавили */
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* 👈 Добавили */
`;

const HeroInfo = styled.div`
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

const FavoriteHeroes = ({ onClose }: FavoriteHeroesProps) => { 
  const userId = 'user123';
// const { favorites, isLoading, toggleFavorite } = useFavorites(userId);
 const {data : favorites, error , isLoading , mutate} = FavoritePresenter.useGetFavorites(userId);

const toogleFavorite = useCallback(async (heroId : number )=>{
   if (!favorites || !Array.isArray(favorites)) return;
   const isCurrentlyFavorite = favorites.some(f => f.id === heroId);

 await FavoritePresenter.toggleFavorites(userId, heroId, isCurrentlyFavorite)
  .then(()=>{ mutate() });
},[userId ,mutate, favorites]);

  if (!Array.isArray(favorites) || isLoading) {
    return (
      <Container>
        <Header>
          <Title>Favorite Heroes</Title>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>
        <EmptyMessage>Loading favorites...</EmptyMessage>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container>
        <Header>
          <Title>Favorite Heroes</Title>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>
        <EmptyMessage>No favorite heroes yet. Click ❤️ to add</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Favorite Heroes ({favorites.length})</Title>
        <CloseButton onClick={onClose}>✖</CloseButton>
      </Header>
      <HeroCardWrapper>
        {favorites.map((hero) => (
          <HeroCard key={hero.id}>
            <HeroFrame $rarity={hero.rarity}>
              <HeroImage 
                src={`/src/assets/characterAvatars/${hero.fileName}`} 
                alt={hero.name}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </HeroFrame>
            <HeroInfo> 
              <HeartButton onClick={() => toogleFavorite(hero.id)}> 
                <Heart 
                  size={20} 
                  color="red" 
                  fill="red"
                />
              </HeartButton>
              <h3>{hero.name}</h3>
              <p>ID: {hero.id}</p>
              <p>Level: {hero.level}</p>
              <p>Rarity: {hero.rarity}</p>
              <p>Price: {hero.price} SWR</p>
              <p>Status: {hero.status}</p>
            </HeroInfo>
          </HeroCard>
        ))}
      </HeroCardWrapper>
    </Container>
  );
};

export default FavoriteHeroes;

