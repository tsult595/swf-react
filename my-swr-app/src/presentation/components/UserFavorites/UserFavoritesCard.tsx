import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
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
    

const UserFavoritesCard = ({ hero, addCharacterIsViewed , isViewed}: { hero: Hero, addCharacterIsViewed: () => void, isViewed: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    
    <Card key={hero.id}  data-border-blue={isViewed} onClick={() => {
                addCharacterIsViewed();
                setIsModalOpen(true);
                  }}>
                  <h3>{hero.name}</h3>
                  <p>Rarity: {hero.rarity}</p>
                  <p>Level: {hero.level}</p>
                </Card>
                
                 <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false);}}>
                        <div onClick={(e) => e.stopPropagation()}>
                        <UserFavoritesModal 
                        selectedHero={hero}
                        onclose={() => 
                        { setIsModalOpen(false); }}
                        
                         />
                        </div>
                    </ModalOverlay>
                </>
  )
}

export default UserFavoritesCard