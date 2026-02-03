import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import { HeroesPresenter } from '../..';
import { FavoritePresenter } from '../..';
import { useCallback } from 'react';
import { useUserId } from '../../hooks/useUserId';
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


// todo naping s characters
// todo v model bazi dannix personaja (hero) dobavit pole isLiked
// cto bi vitawit spisok favorites zapros v DB filtraciya po isliked
// fo fronte sama kartocka personaja doljna otpravlat zapros laik ili unlike remove from favorites i unlike
// cto bi pokazivat zapolnenoe serdecko ili net berem hero.isliked 
// ustanovit i nastroit prettier i eslint

const MaincharactersSection = () => {
  const userId = useUserId();
  const { data: heroes, error, isLoading: isHeroesLoading, mutate } = HeroesPresenter.useGetAllHeroes(userId);

  

  const toggleFavorite = useCallback(async (hero: Hero, e?: React.MouseEvent) => {
      e?.stopPropagation();

      const newIsLiked = !hero.isLiked;

      
      mutate(
        (currentHeroes) =>
          currentHeroes?.map((h) =>
            h.id === hero.id ? { ...h, isLiked: newIsLiked } : h
          ),
        false
      );

      try {
        await FavoritePresenter.toggleFavorites(userId, hero.id, hero.isLiked || false);
      } catch (error) {
        console.error('Failed to toggle favorite:', error);
        // noviy zapros na server i podtanet aktualnie dannie servera
        mutate();
      }
    }, [userId, mutate]);

  
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
             toggleFavorite={toggleFavorite} />
          ))}
        </MainHeroesWrapper>
      )}
   
    </>
  );
};

export default MaincharactersSection;
