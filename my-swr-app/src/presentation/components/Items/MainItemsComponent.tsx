import styled from 'styled-components';
import { ItemsPresenter } from '../..';
import { useSelectedOnes } from '../../hooks/useSelectedOnes';

const MainItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 30px;
  gap: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 40px;
`;

const MainItemCard = styled.div`
  width: 260px;
  height: 200px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgba(39, 43, 54, 0.8);
  border: 2px solid #ffd700;
  padding: 16px;
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    background-color: rgba(39, 43, 54, 0.9);
  }
`;

const MainItemCardUpper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  
  h2 {
    color: white;
    margin: 0 0 8px 0;
    font-size: 20px;
  }
`;

const MainItemCardLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  margin-top: auto;
`;

const RarityBadge = styled.span<{ $rarity: string }>`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  background-color: ${props => {
    switch (props.$rarity) {
      case 'Legendary': return '#ffd700';
      case 'Epic': return '#9c27b0';
      case 'Rare': return '#2196f3';
      default: return '#4caf50';
    }
  }};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
  }
`;

const MainItemInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 14px;
  width: 100%;
  height: fit-content;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  
  p {
    margin: 5px 0;
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

interface MainItemsComponentProps {
  text ?: string;
}

const MainItemsComponent = ({ text }: MainItemsComponentProps) => {
  const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
  const { setSelectedItem } = useSelectedOnes();

  return (
    <>
      {isLoading && (
        <LoadingWrapper>
          <div>Loading items...</div>
        </LoadingWrapper>
      )}

      {error && (
        <ErrorWrapper>
          <div>❌ Failed to load items</div>
          <button onClick={() => mutate()}>Retry</button>
        </ErrorWrapper>
      )}

      {!isLoading && !error && items && (
        <MainItemsWrapper>
          {items.map((item) => (
            <MainItemCard key={item.id} onClick={() => setSelectedItem(item)}>
              <MainItemCardUpper>
                <p>{text}</p>
                <h2>{item.name}</h2>
              </MainItemCardUpper>
              <MainItemInfo>
                <p>{item.description}</p>
              </MainItemInfo>
              <MainItemCardLower>
                <RarityBadge $rarity={item.rarity}>{item.rarity}</RarityBadge>
              </MainItemCardLower>
            </MainItemCard>
          ))}
        </MainItemsWrapper>
      )}
    </>
  );
};

export default MainItemsComponent;