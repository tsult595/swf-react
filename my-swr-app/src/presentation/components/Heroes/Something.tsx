
import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
import { useHeroes } from '../../hooks/useHeroes';
import { ItemsPresenter } from '../..';



const Container = styled.div`
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  color: white;
  flex-direction: column;
  display: flex;
`;

const HeroSection = styled.div`
  width: 90%;
  height: auto;
  
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 30px;
`;

const ItemSection = styled.div`
   width: 90%;
  height: auto;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  border-radius: 15px;
`;



const HeroCard = styled.div<{ $rarity: string }>`
  width: 250px;
  height: 350px;
  border: 5px solid transparent;
  border-image-repeat: stretch;
  border-radius: 10px;
  background: yellow;
`;

const ItemCard = styled.div<{ $rarity: string }>`
   width: 250px;
  height: 350px;
  border: 5px solid transparent;
  border-image-repeat: stretch;
  border-radius: 10px;
  background: yellow;
`;
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 10px;
  color: #ef4444;
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background: #dc2626;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #ffd700;
  font-size: 1.2rem;
`;


const Something = ({ onSomethingClick, handleHeroClick }: { onSomethingClick: (item: Item) => void, handleHeroClick?: (hero: Hero) => void }) => {
   const { data: heroes, error: heroesError, isLoading: heroesLoading, mutate: mutateHeroes } = useHeroes();
   const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
  return (
    <>
    <Container>
      {isLoading && <LoadingWrapper>Loading items...</LoadingWrapper>}
        {error && (
          <ErrorWrapper>
            <div>Error loading items</div>
            <button onClick={() => mutate()}>Retry</button>
          </ErrorWrapper>
        )}
         {heroesLoading && <LoadingWrapper>Loading heroes...</LoadingWrapper>}
        {heroesError && (
          <ErrorWrapper>
            <div>Error loading heroes</div>
            <button onClick={() => mutateHeroes()}>Retry</button>
          </ErrorWrapper>
        )}
      <HeroSection>
      {
        heroes?.map((hero)=>(
          <HeroCard key={hero.id} $rarity={hero.rarity} onClick={() => handleHeroClick?.(hero)}>
            <p>{hero.name}</p>
            <p>Rarity: {hero.rarity}</p>
            <p>Level: {hero.level}</p>
          </HeroCard>
        ))
      }
      </HeroSection>
      <ItemSection>
        {
        items?.map((items)=>(
          <ItemCard key={items.id} $rarity={items.rarity} onClick={() => onSomethingClick(items)}>
            <p>{items.name}</p>
            <p>{items.description}</p>
            <p>{items.rarity}</p>
          </ItemCard>
        ))
      }
      </ItemSection>
    </Container>
    </>
  )
}

export default Something