import type { Item } from "../../../Domain/Entities/ItemsTypes"
import styled from 'styled-components';
import { ItemsPresenter } from "../..";
import { useUserId } from "../../hooks/useUserId";


const BoughtItemsCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
`;

const BoughtItemsCard = ({item , mutate}: {item: Item, mutate: () => void}) => {
   const userId = useUserId();
  return (
    <BoughtItemsCardWrapper>
      <button onClick={async() => await ItemsPresenter.deleteBoughtItem(userId, item.id)
      .then(() => mutate())}>delete</button>
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>Rarity: {item.rarity}</div>
    </BoughtItemsCardWrapper>
  );
}

export default BoughtItemsCard