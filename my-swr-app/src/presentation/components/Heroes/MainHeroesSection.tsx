import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import { Heart } from 'lucide-react';
import { useHeroes } from '../../hooks/useHeroes';
import { FavoritePresenter } from '../..';
import { useCallback } from 'react';
import { useUserId } from '../../hooks/useUserId';
 

const MainHeroesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  gap: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 40px;
  
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
      return 'character_border_violet.png';
    case 'Middle':
      return 'character_border_blue.png';
    default:
      return 'character_border_common.png';
  }
};

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

interface MainHeroesSectionProps {
  onHeroClick: (hero: Hero) => void;
}

const MainHeroesSection = ({
  onHeroClick,
 
 
 
}: MainHeroesSectionProps) => {
  const userId = useUserId();
  const { data: heroes, error, isLoading: isHeroesLoading, mutate } = useHeroes();
  const { data: favorites,  mutate: mutateFavorites } = FavoritePresenter.useGetFavorites(userId);
  

  const toggleFavorite = useCallback(async (hero: Hero, e?: React.MouseEvent) => {
      e?.stopPropagation();
  
      const isCurrentlyFavorite = favorites?.some((f: Hero) => f.id === hero.id) || false;
  
      await FavoritePresenter.toggleFavorites(userId, hero.id, isCurrentlyFavorite);
      mutateFavorites();
    }, [userId, favorites, mutateFavorites]);
    

     const isFavorite = (heroId: string | number) => favorites?.some((f: Hero) => f.id === heroId) || false;
  return (
    <>
      {isHeroesLoading && (
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

      {!isHeroesLoading && !error && heroes && (
        <MainHeroesWrapper>
          {heroes.map((hero) => (
            <MainHeroCard key={hero.id} onClick={() => onHeroClick(hero)}>
              <MainHeroCardInner>
                <MainHeroCardUpper>
                  <h2>{hero.name}</h2>
                </MainHeroCardUpper>
                <MainHeroCardLower>
                  <p>ID: {hero.id}</p>
                  <HeartButton onClick={(e) => toggleFavorite(hero, e)}> 
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
    </>
  );
};

export default MainHeroesSection;


// const toggleFavorite = useCallback(async (hero: Hero, e?: React.MouseEvent) => {
//       e?.stopPropagation();
  
//       const isCurrentlyFavorite = favorites?.some((f: Hero) => f.id === hero.id) || false;
  
//       // Оптимистичное обновление
//       mutateFavorites(
//         isCurrentlyFavorite
//           ? favorites?.filter((f: Hero) => f.id !== hero.id)
//           : [...(favorites || []), hero],
//         false
//       );

//       try {
//         await FavoritePresenter.toggleFavorites(userId, hero.id, isCurrentlyFavorite);
//         mutateFavorites(); // Ревалидация для синхронизации
//       } catch (error) {
//         mutateFavorites(); // Откат при ошибке
//         console.error('Failed to toggle favorite:', error);
//       }
//     }, [userId, favorites, mutateFavorites]);