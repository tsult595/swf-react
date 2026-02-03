
import styled from 'styled-components';
import { useState } from 'react';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';
import BoxDetailModal from '../../Modals/BoxModal/BoxDetailModal';

const HeroCard = styled.div`
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

// todo data-dark data-open styled bez propsov

const SomethingCard = ({box}: {box: MysteryBox} ) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
    const [shapeMode, setShapeMode] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  
  return (
    <>
   
      <HeroCard 
            key={box.id} 
            data-dark={darkMode} 
            data-border-blue={selectedBoxId === box.id}
            onClick={() => {
              setSelectedBoxId(box.id);
              setIsModalOpen(true);
            }}
          >
            <button onClick={(e) => { e.stopPropagation();
            setDarkMode(!darkMode);}
            } data-dark={darkMode}> 
              dark
            </button>
            <Button onClick={(e)=>{e.stopPropagation(); 
            setShapeMode(!shapeMode);
            }} data-blue={shapeMode}>shape</Button>
            <p>{box.name}</p>
            <p>Rarity: {box.rarity}</p>
            
          </HeroCard>

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
