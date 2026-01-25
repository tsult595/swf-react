import styled from 'styled-components';
import { useState } from 'react';
import ButtonMainImgDefault from '../../../assets/toggle_button_default.png'
import ButtonMainImgHover from '../../../assets/toggle_button_hover.png'; 
import ButtonMainImgTogled from '../../../assets/toggle_button_toggled.png'; 
import FavoriteHeroes from '../../Modals/FavoritesListModal/FavoriteCharacters';
import MainComponentChat from '../Chat/MainComponentChat'; 
import { FavoritePresenter } from '../..';
import MainItemsComponent from '../Items/MainItemsComponent';
import MaincharactersSection from '../Heroes/MaincharactersSection';
import Something from '../Heroes/Something';
import { HomePageTabEnum } from '../../../Domain/Entities/enums/homePageEnum';
import { useUserId } from '../../hooks/useUserId';

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
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeTab, setActiveTab] = useState(HomePageTabEnum.CHARACTERS);
   const userId = useUserId(); 
  const { data: favorites } = FavoritePresenter.useGetFavorites(userId);



  return (
    <>
      <MainContentWrapper> 
        <MainContentButtonsWrapper>
          <MainContentButtons 
            $active={activeTab === HomePageTabEnum.CHARACTERS} 
            onClick={() => setActiveTab(HomePageTabEnum.CHARACTERS)}
          >
            <ButtonText>Characters</ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === HomePageTabEnum.ITEMS} 
            onClick={() => setActiveTab(HomePageTabEnum.ITEMS)}
          >
            <ButtonText>{HomePageTabEnum.ITEMS}</ButtonText>
          </MainContentButtons>
          <MainContentButtons onClick={() => setShowFavorites(true)}>
            <ButtonText>
              Favorites ({favorites?.length || 0})
            </ButtonText>
          </MainContentButtons>
          <MainContentButtons 
            $active={activeTab === HomePageTabEnum.CHAT} 
            onClick={() => setActiveTab(HomePageTabEnum.CHAT)}
          >
            <ButtonText>Chat</ButtonText>
          </MainContentButtons>

          <MainContentButtons 
            $active={activeTab === HomePageTabEnum.SOMETHING} 
            onClick={() => setActiveTab(HomePageTabEnum.SOMETHING)}
          >
            <ButtonText>Something</ButtonText>
          </MainContentButtons>
        </MainContentButtonsWrapper>

      
        {activeTab === HomePageTabEnum.CHARACTERS && (
        
          <MaincharactersSection />
        )}

     
        {activeTab === HomePageTabEnum.CHAT && (
          <ChatWrapper>
            <MainComponentChat />
          </ChatWrapper>
        )}

       
        {activeTab === HomePageTabEnum.ITEMS && (
          <ItemsWrapper>
            <MainItemsComponent text='meow' />
          </ItemsWrapper>
        )}

        {activeTab === HomePageTabEnum.SOMETHING && (
          <ItemsWrapper>
            <Something />
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
    </>
  );
}

export default MainContent;