import styled from 'styled-components';
import { Heart } from 'lucide-react';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import LikedCharacterModal  from '../../Modals/LikedCharacterModal/LikedCharacterModal';
import { useState } from 'react';

const MainHeroCard = styled.div`
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

const MainHeroCardInner = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  transition: 0.3s all ease-in-out;
  padding: 16px;
`;

const MainHeroCardUpper = styled.div`
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

const MainHeroCardLower = styled.div`
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

const MainHeroInfo = styled.div`
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

const HeroFrame = styled.div<{ $rarity: string }>`
  width: 230px;
  height: 350px;
  border: 25px solid transparent;
  border-image: url(${props => `/src/assets/${getFrameByRarity(props.$rarity)}`}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  overflow: hidden;
  
  ${MainHeroCard}:hover & {
    filter: brightness(1.2);
  }
`;

const HeroImage = styled.img`
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
  hero, 
  toggleFavorite, 
  

}: {
  hero: Hero;
  toggleFavorite: (hero: Hero, e?: React.MouseEvent) => Promise<void>;
}) => {
   const [isModalOpen, setIsModalOpen] = useState(false); 
   const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  
  return (
    <>
    <MainHeroCard key={hero.id} onClick={() => { setSelectedHero(hero);
         setIsModalOpen(true); }}>
              <MainHeroCardInner>
                <MainHeroCardUpper>
                  <h2>{hero.name}</h2>
                </MainHeroCardUpper>
                <MainHeroCardLower>
                  <p>ID: {hero.id}</p>
                  <HeartButton onClick={(e) => toggleFavorite(hero, e)}>
                    <Heart
                      size={20}
                      color={hero.isLiked ? "red" : "#fff"}
                      fill={hero.isLiked ? "red" : "none"}
                    />
                  </HeartButton>
                  <StatusBadge $status={hero.status}>{hero.status}</StatusBadge>
                </MainHeroCardLower>
                <HeroFrame $rarity={hero.rarity}>
                  {hero.fileName ? (
                    <HeroImage 
                      src={`/src/assets/characterAvatars/${hero.fileName}`} 
                      alt={hero.name}
                      onError={(e) => {
                        console.error('Image load error:', hero.fileName);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span style={{ color: 'white' }}>No Image</span>
                  )}
                </HeroFrame>
                <MainHeroInfo>
                  <p>Level: {hero.level}</p>
                  <p>Price: {hero.price} SWR</p>
                </MainHeroInfo>
              </MainHeroCardInner>
            </MainHeroCard>

              <ModalOverlay $isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}> 
                    {selectedHero && <div onClick={(e) => e.stopPropagation()}>
                      <LikedCharacterModal 
                        onClose={() => setIsModalOpen(false)}
                        hero={selectedHero}
                      />
                    </div>}
                  </ModalOverlay> 
              </>
  )
}

export default MainCharacterCard