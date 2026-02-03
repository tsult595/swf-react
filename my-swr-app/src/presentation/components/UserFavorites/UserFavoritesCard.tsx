import styled from 'styled-components';
import type {Character } from '../../../Domain/Entities/HeroTypes';
import { useState } from 'react';
import UserFavoritesModal from '../../Modals/UserFavoritesModal/UserFavoritesModal';



const Card = styled.div`
   background-color: #211f1f;
     &[data-border-blue='true'] {
     border: 5px solid blue;
     }
   border-radius: 8px;   
    padding: 16px;
    margin: 10px;
    width: 200px;
    height: 150px;
    cursor: pointer;
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
    

const UserFavoritesCard = ({ character, addCharacterIsViewed , isViewed}: { character: Character, addCharacterIsViewed: () => void, isViewed: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <Card key={character.id}  data-border-blue={isViewed} onClick={() => {
                addCharacterIsViewed();
                setIsModalOpen(true);
                  }}>
                  <h3>{character.name}</h3>
                  <p>Rarity: {character.rarity}</p>
                  <p>Level: {character.level}</p>
                </Card>
                
                 <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false);}}>
                        <div onClick={(e) => e.stopPropagation()}>
                        <UserFavoritesModal 
                        selectedCharacters={character}
                        onClose={() => 
                        { setIsModalOpen(false); }}
                        
                         />
                        </div>
                    </ModalOverlay>
                </>
  )
}

export default UserFavoritesCard