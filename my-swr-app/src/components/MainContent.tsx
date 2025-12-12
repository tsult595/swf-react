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
import MainComponentChat from './MainComponentChat'; // 👈 Добавили импорт
import { Heart } from 'lucide-react';
import useSWR, { mutate as globalMutate } from 'swr';
import { fetcher } from '../utils/ApiFetcher';
import { addToFavorites , removeFromFavorites } from '../api/favoritesApi';

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
  padding: 10px 40px;
  padding-top: 15px;
`;

const MainContentButtons = styled.button<{ $active?: boolean }>`
  width: 167px;
  height: 42px;
  color: white;
  background-image: url(${props => props.$active ? ButtonMainImgTogled : ButtonMainImgDefault});
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


const ChatWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  padding: 20px 40px;
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
  overflow: hidden;
  
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
  display: block;
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
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState<'characters' | 'items' | 'chat'>('characters'); 
  
  const userId = 'user123';

  const { data: heroes, error, isLoading, mutate: mutateHeroes } = useSWR<Hero[]>(
    '/heroes',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const { data: favorites, mutate: mutateFavorites } = useSWR<Hero[]>(
    `/favorites/${userId}`,
    () => fetch(`http://localhost:3001/api/favorites/${userId}`).then(r => r.json()),
    {
      revalidateOnFocus: false,
      refreshInterval: 0, 
    }
  );

  const handleAddToFavorite = async (hero: Hero, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const currentFavorites = favorites || [];  
      const isFavorite = currentFavorites.some(fav => fav.id === hero.id);
      
      if (isFavorite) {
        const newFavorites = currentFavorites.filter(fav => fav.id !== hero.id);
        mutateFavorites(newFavorites, false);
        globalMutate(`/favorites/${userId}`, newFavorites, false);
        
        await removeFromFavorites(userId, hero.id);
        console.log(`✅ Removed ${hero.name} from favorites`);
      } else {
        const newFavorites = [...(favorites || []), hero];
        mutateFavorites(newFavorites, false);
        globalMutate(`/favorites/${userId}`, newFavorites, false);
        
        await addToFavorites(userId, hero.id);
        console.log(`✅ Added ${hero.name} to favorites`);
      }
      
      mutateFavorites();
      globalMutate(`/favorites/${userId}`);
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      mutateFavorites();
      globalMutate(`/favorites/${userId}`);
    }
  };

  const isFavorite = (heroId: number) => {
    return favorites?.some(hero => hero.id === heroId) ?? false;
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
          <MainContentButtons 
            $active={activeTab === 'characters'} 
            onClick={() => setActiveTab('characters')}
          >
            <ButtonText>Characters</ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === 'items'} 
            onClick={() => setActiveTab('items')}
          >
            <ButtonText>Items</ButtonText>
          </MainContentButtons>
          <MainContentButtons onClick={() => setShowFavorites(true)}>
            <ButtonText>
              Favorites ({favorites?.length || 0})
            </ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          >
            <ButtonText>Chat</ButtonText>
          </MainContentButtons>
        </MainContentButtonsWrapper>

      
        {activeTab === 'characters' && (
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
                <button onClick={() => mutateHeroes()}>Retry</button>
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
            ))}
          </MainHeroesWrapper>
        )}

     
        {activeTab === 'chat' && (
          <ChatWrapper>
            <MainComponentChat />
          </ChatWrapper>
        )}

       
        {activeTab === 'items' && (
          <MainHeroesWrapper>
            <LoadingWrapper>
              <div>Items section coming soon...</div>
            </LoadingWrapper>
          </MainHeroesWrapper>
        )}
      </MainContentWrapper>

      <ModalOverlay $isOpen={showFavorites} onClick={() => setShowFavorites(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteHeroes 
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