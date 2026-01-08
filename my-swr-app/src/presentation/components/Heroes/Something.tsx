
import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
import styled from 'styled-components';
import { ItemsPresenter } from '../..';

const ItemCardWrapper = styled.div`
  width: 95%;
  height: 200px;
  background-color: yellow;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ItemCard = styled.div`
  flex: 1;
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

  
const Something = ({ onSomethingClick }: { onSomethingClick: (hero: Item) => void }) => {
 const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
  return (
    <div>
        {isLoading && <div>Loading items...</div>}
        {error && <div>Error loading items. <button onClick={() => mutate()}>Retry</button></div>}
        <ItemCardWrapper>
        {items && items.map((item)=>(
            <ItemCard key={item.id} onClick={() => onSomethingClick(item)}>
                <h2>{item.name}</h2>
                <h2>{item.description}</h2>
            </ItemCard>
        ))}
        </ItemCardWrapper>
          
    </div>

  )
}

export default Something