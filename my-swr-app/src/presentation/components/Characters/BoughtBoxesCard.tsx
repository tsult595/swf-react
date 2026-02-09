import styled from 'styled-components';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';
import { MysteryBoxPresenter } from '../..';
import { useUserId } from '../../hooks/useUserId';


const BoughtBoxCard = styled.div`
  width: 250px;
  height: 350px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  &[data-border-blue='true'] {
  border: 5px solid blue;
  }

  border-image-repeat: stretch;
  border-radius: 10px;
  background: yellow;

  &[data-dark='true'] {
  background: white;
  }

  color: black;
`;

const BoughtBoxesCard = ({box, mutateBoxes }: {box: MysteryBox, mutateBoxes: () => void}) => {
  const userId = useUserId();
  return (
    <BoughtBoxCard>
       <button
       onClick={
        async () => {
         await MysteryBoxPresenter.deleteBoughtBox(userId, box.id);
         alert('Box deleted successfully');
         mutateBoxes();
        }
       }
       >delete</button>
     <p>{box.name}</p>
    <p>Rarity: {box.rarity}</p>
    </BoughtBoxCard>
  )
}

export default BoughtBoxesCard