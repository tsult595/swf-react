import styled from 'styled-components';
import type { Hero } from '../types/HeroTypes';
import { useState } from 'react';
 
import heroFrame from '../assets/character_border_common.png'; 
import heroFrameHigh from '../assets/character_border_violet.png'; 
import heroFrameMiddle from '../assets/character_border_blue.png'; 
import ButtonMainImgDefault from '../assets/toggle_button_default.png'
import ButtonMainImgHover from '../assets/toggle_button_hover.png'; 
import ButtonMainImgTogled from '../assets/toggle_button_toggled.png'; 
import LikedHeroes from './LikedHeroes';
import FavoriteHeroes from './FavoriteHeroes';
import { Heart } from 'lucide-react';
import useSWR from 'swr'; 
import { fetcher } from '../utils/ApiFetcher';


// import bulbazavr from `../assets/characterAvatars/${HeroApi[0].fileName}`;
// import pickachu  from `../assets/characterAvatars/${HeroApi[1].fileName}`;
// import catFish from `../assets/characterAvatars/${HeroApi[2].fileName}`;
// import ballPokemon from `../assets/characterAvatars/${HeroApi[3].fileName}`;
// import blastuas  from `../assets/characterAvatars/${HeroApi[4].fileName}`;
// import duckPokemon from `../assets/characterAvatars/${HeroApi[5].fileName}`;
// import charmander from `../assets/characterAvatars/${HeroApi[6].fileName}`; 

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

const MainContentWrapper = styled.main` 
  flex: 1;
  padding-left: 50px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContentButtonsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 40px;

  width: 100%;
  height: 90px;
  
  background-color: rgb(0, 0, 0);

  padding: 10px 0;
  padding-top: 15px;
`;

const MainContentButtons = styled.button`
  width: 167px;
  height: 42px;

  color: white;
  background-image: url(${ButtonMainImgDefault});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-image: url(${ButtonMainImgHover});
  }

  &:active {
    transform: translateY(2px);
    background-image: url(${ButtonMainImgTogled});
  }
`;

const MainHeroesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
 
  margin-top: 20px;
  gap: 40px;
  padding-bottom: 50px;

  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    
    &:hover {
      background: linear-gradient(180deg, #764ba2 0%, #667eea 100%);
    }
  }

  scrollbar-width: thin;
  scrollbar-color: #667eea rgba(0, 0, 0, 0.3);
  scroll-behavior: smooth;
`;

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
  height: 350px;
  border: 25px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  
  ${MainHeroCard}:hover & {
    filter: brightness(1.2);
  }
`;

const ButtonText = styled.h3`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: #8b929aff;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

function MainContent() {
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectToFavorite, setSelectToFavorite] = useState<Hero[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

    const { data: heroes, error, isLoading, mutate } = useSWR<Hero[]>('/heroes', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, 
  });


    const handleAddToFavorite = (hero: Hero, e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    setSelectToFavorite((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === hero.id);
      
      if (isAlreadyFavorite) {
       
        return prevFavorites.filter(fav => fav.id !== hero.id);
      } else {
        
        return [...prevFavorites, hero];
      }
    });
  };

   const isFavorite = (heroId: number) => {
    return selectToFavorite.some(hero => hero.id === heroId);
  };

  const handleHeroClick = (hero: Hero) => {
    setSelectedHero(hero);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHero(null);
  };

  return (
    <>
      <MainContentWrapper> 
        <MainContentButtonsWrapper>
          <MainContentButtons>
            <ButtonText>Characters</ButtonText>
          </MainContentButtons>
          <MainContentButtons>
            <ButtonText>Items</ButtonText>
          </MainContentButtons>
          <MainContentButtons onClick={() => setShowFavorites(true)}>
            <ButtonText>
              Favorites ({selectToFavorite.length})
            </ButtonText>
          </MainContentButtons>
          <MainContentButtons>
            <ButtonText>Consumables</ButtonText>
          </MainContentButtons>
        </MainContentButtonsWrapper>

        <MainHeroesWrapper>
        
          {isLoading && (
            <LoadingWrapper>
              <div>Loading heroes...</div>
            </LoadingWrapper>
          )}

         
          {error && (
            <ErrorWrapper>
              <div>❌ Failed to load heroes</div>
              <div>Please check if server is running on port 3001</div>
              <button onClick={() => mutate()}>Retry</button>
            </ErrorWrapper>
          )}

         
          {!isLoading && !error && heroes && heroes.map((hero) => (
            <MainHeroCard key={hero.id} onClick={() => handleHeroClick(hero)}>
              <MainHeroCardInner>
                <MainHeroCardUpper>
                  <h2>{hero.name}</h2>
                </MainHeroCardUpper>
                <MainHeroCardLower>
                  <p>ID: {hero.id}</p>
                  <HeartButton onClick={(e) => handleAddToFavorite(hero, e)}> 
                    <Heart 
                      size={20} 
                      color={isFavorite(hero.id) ? "red" : "#fff"} 
                      fill={isFavorite(hero.id) ? "red" : "none"} 
                    />
                  </HeartButton>
                  <StatusBadge $status={hero.status}>{hero.status}</StatusBadge>
                </MainHeroCardLower>
                <HeroFrame $rarity={hero.rarity}>
                  {hero.fileName ? (
                    <HeroImage 
                      src={`/src/assets/characterAvatars/${hero.fileName}`} 
                      alt={hero.name} 
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
          ))}
        </MainHeroesWrapper>
      </MainContentWrapper>

      <ModalOverlay $isOpen={showFavorites} onClick={() => setShowFavorites(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteHeroes 
            heroes={selectToFavorite} 
            onClose={() => setShowFavorites(false)}
          />
        </div>
      </ModalOverlay>

      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}> 
        <div onClick={(e) => e.stopPropagation()}>
          {selectedHero && (
            <LikedHeroes 
              hero={selectedHero}
               onClose={handleCloseModal}
            />
          )}
        </div>
      </ModalOverlay>
    </>
  );
}

export default MainContent;