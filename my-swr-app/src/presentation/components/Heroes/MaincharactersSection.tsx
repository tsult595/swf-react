import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import { HeroesPresenter } from '../..';
import { FavoritePresenter } from '../..';
import { useCallback } from 'react';
import { useUserId } from '../../hooks/useUserId';
import { useSelectedOnes } from '../../hooks/useSelectedOnes';
import LikedCharacterModal  from '../../Modals/LikedCharacterModal/LikedCharacterModal';
import MainCharacterCard from './MainCharacterCard';
 

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

const MaincharactersSection = () => {
  const userId = useUserId();
  const { selectedHero, setSelectedHero } = useSelectedOnes();
  const { data: heroes, error, isLoading: isHeroesLoading, mutate } = HeroesPresenter.useGetAllHeroes();
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
            <MainCharacterCard key={hero.id}
             hero={hero} 
             toggleFavorite={toggleFavorite} 
             isFavorite={isFavorite} 
             setSelectedHero={setSelectedHero} />
          ))}
        </MainHeroesWrapper>
      )}
      <ModalOverlay $isOpen={selectedHero !== null} onClick={() => setSelectedHero(null)}> 
        <div onClick={(e) => e.stopPropagation()}>
          <LikedCharacterModal 
            onClose={() => setSelectedHero(null)}
          />
        </div>
      </ModalOverlay> 
    </>
  );
};

export default MaincharactersSection;
