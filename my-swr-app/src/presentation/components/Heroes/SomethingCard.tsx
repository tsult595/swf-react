
import styled from 'styled-components';
import { useState } from 'react';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';

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

// todo data-dark data-open styled bez propsov

const SomethingCard = ({box, setSelectedBox}: {box: MysteryBox, setSelectedBox: React.Dispatch<React.SetStateAction<MysteryBox | null>>} ) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
    const [shapeMode, setShapeMode] = useState<boolean>(false);
  return (
      <HeroCard 
            key={box.id} 
            data-dark={darkMode} 
            data-border-blue={selectedBoxId === box.id}
            onClick={() => {
              setSelectedBoxId(box.id);
              setSelectedBox(box);
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
  )
}

export default SomethingCard
