
import styled from 'styled-components';
import { useState } from 'react';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';
import BoxDetailModal from '../../Modals/BoxModal/BoxDetailModal';
import { useUserId } from '../../hooks/useUserId';
import { MysteryBoxPresenter } from '../..';


const CharacterCard = styled.div`
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

const Button = styled.button`
  padding: 8px 16px;
  background: grey;
  
  &[data-blue='true'] {
    background: blue;
  }
 

  color: white;
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



const SomethingCard = ({box, mutateBoxes}: {box: MysteryBox, mutateBoxes: () => void} ) => {
    const userId = useUserId();
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
    const [shapeMode, setShapeMode] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  
  return (
    <>
   
      <CharacterCard 
            key={box.id} 
            data-dark={darkMode} 
            data-blue={shapeMode}
            data-border-blue={selectedBoxId === box.id}
            onClick={() => {
              setSelectedBoxId(box.id);
              setIsModalOpen(true);
            }}
          >
            <Button onClick={(e) => { e.stopPropagation();
            setDarkMode(!darkMode);}
            }> 
              dark
            </Button>
            <Button onClick={(e)=>{e.stopPropagation(); 
            setShapeMode(!shapeMode);
            }} data-blue={shapeMode}>shape</Button>
            <p>{box.name}</p>
            <p>Rarity: {box.rarity}</p>
            <button
            onClick={async (e) => {
              e.stopPropagation();
              await MysteryBoxPresenter.buyBox(userId, box.id)
              .then(() => alert('Box bought successfully!'))
              .then(() => mutateBoxes())
              .catch((error) => alert(`Failed to buy box: ${error.message}`));
            }}
            >buy item</button>
          </CharacterCard>

        <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false); }}>
        <div onClick={(e) => e.stopPropagation()}>
          <BoxDetailModal onClosee={() => { setIsModalOpen(false); }}
          selectedBox={box}
           />
        </div>
      </ModalOverlay>
           </>
  )
}

export default SomethingCard
