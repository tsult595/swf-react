import styled from 'styled-components';
import { ItemsPresenter } from '../..';
import MainItemsCard from './MainItemsCard';

const MainItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 30px;
  gap: 40px;
  padding: 20px 20px 50px 40px;
  overflow-y: auto;
  overflow-x: hidden;
  
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

const MainItemsComponent = () => {
  const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
  
  
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
            <MainItemsCard
             item={item} key={item.id}
             />

          ))}
        </MainItemsWrapper>
      )}
   
    </>
  );
};

export default MainItemsComponent;