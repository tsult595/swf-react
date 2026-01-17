import styled from 'styled-components';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
import { useState} from 'react';
import useSWR from 'swr';
import ButtonMainImgDefault from '../../../assets/toggle_button_default.png'
import ButtonMainImgHover from '../../../assets/toggle_button_hover.png'; 
import ButtonMainImgTogled from '../../../assets/toggle_button_toggled.png'; 
import LikedHeroes from '../../Modals/LikedHeroModal/LikedHeroes';
import FavoriteHeroes from '../../Modals/FavoritesListModal/FavoriteHeroes';
import MainComponentChat from '../Chat/MainComponentChat'; 
import { FavoritePresenter } from '../..';
import MainItemsComponent from '../Items/MainItemsComponent';
import ItemsDetailModal from '../../Modals/ItemsModal/ItemsDetailModal';
import BoxDetailModal from '../../Modals/BoxModal/BoxDetailModal';
import MainHeroesSection from '../Heroes/MainHeroesSection';
import Something from '../Heroes/Something';
import type { MysteryBox } from '../../../Domain/Entities/MystoryBoxTypes';


const MainContentWrapper = styled.main` 
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContentButtonsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 40px;
  width: 100%;
  height: 90px;
  background-color: rgb(0, 0, 0);
  padding: 10px 40px;
  padding-top: 15px;
`;

const MainContentButtons = styled.button<{ $active?: boolean }>`
  width: 167px;
  height: 42px;
  color: white;
  background-image: url(${props => props.$active ? ButtonMainImgTogled : ButtonMainImgDefault});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-image: url(${ButtonMainImgHover});
  }

  &:active {
    transform: translateY(2px);
    background-image: url(${ButtonMainImgTogled});
  }
`;

const ButtonText = styled.h3`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: #8b929aff;
`;

const ChatWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 110px);
  padding: 20px 40px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  gap: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 40px;
  
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    
    &:hover {
      background: linear-gradient(180deg, #764ba2 0%, #667eea 100%);
    }
  }

  scrollbar-width: thin;
  scrollbar-color: #667eea rgba(0, 0, 0, 0.3);
  scroll-behavior: smooth;
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



function MainContent() {
  const { mutate: setSelectedHero } = useSWR<Hero | null>('selectedHero', null, { fallbackData: null });
  const { mutate: setSelectedItem } = useSWR<Item | null>('selectedItem', null, { fallbackData: null });
  const {mutate: setSelectedBox} = useSWR<MysteryBox | null>('selectedBox', null, {fallbackData: null});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isBoxModalOpen, setIsBoxModalOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState<'characters' | 'items' | 'chat' | 'something'>('characters'); 
  const userId = 'user123';
  const { data: favorites } = FavoritePresenter.useGetFavorites(userId);
 


  const handleHeroClick = (hero: Hero) => {
    setSelectedHero(hero);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHero(null);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleCloseItemModal = () => {
    setIsItemModalOpen(false);
    setSelectedItem(null);
  };

  const handleBoxgClick = (box: MysteryBox) => {
    setSelectedBox(box);
    setIsBoxModalOpen(true);
  }

  const handleCloseBoxModal = () => {
    setIsBoxModalOpen(false);
    setSelectedBox(null);
  }



  return (
    <>
      <MainContentWrapper> 
        <MainContentButtonsWrapper>
          <MainContentButtons 
            $active={activeTab === 'characters'} 
            onClick={() => setActiveTab('characters')}
          >
            <ButtonText>Characters</ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === 'items'} 
            onClick={() => setActiveTab('items')}
          >
            <ButtonText>Items</ButtonText>
          </MainContentButtons>
          <MainContentButtons onClick={() => setShowFavorites(true)}>
            <ButtonText>
              Favorites ({favorites?.length || 0})
            </ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
          >
            <ButtonText>Chat</ButtonText>
          </MainContentButtons>

          <MainContentButtons 
            $active={activeTab === 'something'} 
            onClick={() => setActiveTab('something')}
          >
            <ButtonText>Something</ButtonText>
          </MainContentButtons>
        </MainContentButtonsWrapper>

      
        {activeTab === 'characters' && (
          <MainHeroesSection
            onHeroClick={handleHeroClick}
          />
        )}

     
        {activeTab === 'chat' && (
          <ChatWrapper>
            <MainComponentChat />
          </ChatWrapper>
        )}

       
        {activeTab === 'items' && (
          <ItemsWrapper>
            <MainItemsComponent onItemClick={handleItemClick}
            text='meow'
             />
          
          </ItemsWrapper>
        )}

        {activeTab === 'something' && (
          <ItemsWrapper>
            <Something onBoxClick={handleBoxgClick}
             />
          </ItemsWrapper>
        )}
      </MainContentWrapper>

      <ModalOverlay $isOpen={showFavorites} onClick={() => setShowFavorites(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteHeroes 
            onClose={() => setShowFavorites(false)}
          />
        </div>
      </ModalOverlay>

      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}> 
        <div onClick={(e) => e.stopPropagation()}>
          <LikedHeroes 
            onClose={handleCloseModal}
          />
        </div>
      </ModalOverlay>

      <ModalOverlay $isOpen={isItemModalOpen} onClick={handleCloseItemModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <ItemsDetailModal onClose={handleCloseItemModal} />
        </div>
      </ModalOverlay>
      
      <ModalOverlay $isOpen={isBoxModalOpen} onClick={handleCloseBoxModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <BoxDetailModal onClosee={handleCloseBoxModal} />
        </div>
      </ModalOverlay>
    </>
  );
}

export default MainContent;