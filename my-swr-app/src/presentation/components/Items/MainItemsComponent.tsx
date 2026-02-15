import styled from 'styled-components';
import { ItemsPresenter } from '../..';
import MainItemsCard from './MainItemsCard';
import { useUserId } from '../../hooks/useUserId';
import BoughtItemsCard from './BoughtItemsCard';
import { useState } from 'react';
import ItemPaginationButton from './ItemPaginationButton';

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

const Button = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 180px;
  
  
  &:hover {
    background: #764ba2;
  }
`;


const MainItemsComponent = () => {
  const userId = useUserId(); 
  const [showBoughtItems, setShowBoughtItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 2; 
  const { data, error, isLoading, mutate } = ItemsPresenter.useGetAllItems(currentPage, limit);
  const items = data?.items;
  const boughtItems = items?.filter(item => item.ownerId === userId) || [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  
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

       <ItemPaginationButton
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />

      {!isLoading && !error && items && (
        <MainItemsWrapper>
          {items.map((item) => (
            <MainItemsCard
             item={item} key={item.id} mutate={mutate}
             />
          ))}
        </MainItemsWrapper>
        
      )
    }
      <Button onClick={() => setShowBoughtItems(!showBoughtItems)}>
        {showBoughtItems ? 'Hide bought items' : 'Show bought items'}
      </Button>
      
      {!isLoading && !error && showBoughtItems && (

        <MainItemsWrapper>
          {boughtItems.map((item) => (
            <BoughtItemsCard
             item={item} key={item.id} mutate={mutate}
             />
          ))}
        </MainItemsWrapper>
      )}
  
    </>
  )
}

export default MainItemsComponent

// todo multi step form