import backgroundImage from '../assets/background.png';
import Header from './Header';
import AsideLeft from './AsideLeft';
import LikedHeroes from './LikedHeroes';
import styled from 'styled-components';
import heroFrame from '../assets/character_border_common.png';
import heroFrameHigh from '../assets/character_border_violet.png';
import heroFrameMiddle from '../assets/character_border_blue.png';
import ButtonMainImgDefault from '../assets/toggle_button_default.png';
import ButtonMainImgHover from '../assets/toggle_button_hover.png';
import ButtonMainImgTogled from '../assets/toggle_button_toggled.png';
import imgOne from '../assets/download (1).jpg';
import imgTwo from '../assets/download.jpg';
import imgThree from '../assets/images (1).jpg';
import imgFour from '../assets/images (2).jpg';
import imgFive from '../assets/images (3).jpg';
import imgSix from '../assets/download.jpg';
import { useState } from 'react';

const mockHeroes = [
  {
     id: 1,
    name: 'Dragon Mageq',
    image : imgOne,
    rarity: 'High',
    level: 30,
    price: 300,
    bid : 75,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Dragon Magess',
    rarity: 'Common',
    image : imgTwo,
    level: 30,
    price: 300,
    bid : 75,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Dragon Magek',
    image : imgThree,
    rarity: 'Common',
    level: 30,
    price: 300,
    bid : 75,
    status: 'Cancelled'
  },
  {
    id: 4,
    name: 'Dragon Mage',
    rarity: 'Middle',
    image : imgFour,
    level: 30,
    price: 300,
    bid : 75,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Dragon Mage',
    rarity: 'Middle',
    image : imgFive,
    level: 30,
    price: 300,
    bid : 75,
    status: 'Cancelled'
  },
  {
    id: 6,
    name: 'Goblin Rogue',
    rarity: 'Common',
    image : imgSix,
    price: 120,
    bid : 50,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Goblin Rogue',
    rarity: 'High',
    image : imgOne,
    price: 120,
    bid : 50,
    status: 'Active'
  }
];

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: 
  linear-gradient(rgba(0, 0, 0, 0.89), rgba(0, 0, 0, 0.83)),
  url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContentButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 40px;
  background-color: rgb(0, 0, 0);
  padding: 10px 0;
  padding-top: 22px;
  flex-shrink: 0;
`;

const MainContentButtons = styled.button`
  width: 167px;
  height: 42px;
  color: white;
  background-image: url(${ButtonMainImgDefault});
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

const MainHeroesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  gap: 40px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
  
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

const MainHeroCard = styled.div`
  width: 260px;
  height: 479px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  border-radius: 10px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05) translateY(-5px);
    background-color: rgba(39,43,54, 0.9);
  }
`;

const MainHeroCardInner = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  transition: 0.3s all ease-in-out;
  padding: 16px;
`;

const MainHeroCardUpper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
  
  h2 {
    color: white;
    margin: 0;
    font-size: 20px;
  }
`;

const MainHeroCardLower = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 100%;
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 5px 0;
    font-size: 14px;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  width: fit-content;
  height: fit-content;
  padding: 4px 8px;
  background-color: ${props => props.$status === 'Active' ? '#4caf50' : '#f44336'};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px ${props => props.$status === 'Active' ? 'rgba(76, 175, 80, 0.4)' : 'rgba(244, 67, 54, 0.4)'};
  }
`;

const MainHeroInfo = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: 16px;
  width: 100%;
  height: fit-content;
  color: white;
  display: flex;
  flex-direction: column;
  
  p {
    margin: 5px 0;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const getFrameByRarity = (rarity: string) => {
  switch (rarity) {
    case 'High':
      return heroFrameHigh;
    case 'Middle':
      return heroFrameMiddle;
    default:
      return heroFrame;
  }
};

const HeroFrame = styled.div<{ $rarity: string }>`
  width: 230px;
  height: 350px;
  border: 25px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
  
  ${MainHeroCard}:hover & {
    filter: brightness(1.2);
  }
`;

const ButtonText = styled.h3`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: #8b929aff;
  margin: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

function HomePage() {
  const [selectedHero, setSelectedHero] = useState<typeof mockHeroes[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeroClick = (hero: typeof mockHeroes[0]) => {
    setSelectedHero(hero);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHero(null);
  };

  return (
    <Background>
      <Header />
      <ContentWrapper>
        <AsideLeft />
        <MainContent>
          <MainContentButtonsWrapper>
            <MainContentButtons>
              <ButtonText>Characters</ButtonText>
            </MainContentButtons>
            <MainContentButtons>
              <ButtonText>Items</ButtonText>
            </MainContentButtons>
            <MainContentButtons>
              <ButtonText>Consumables</ButtonText>
            </MainContentButtons>
          </MainContentButtonsWrapper>
          <MainHeroesWrapper>
            {mockHeroes.map((hero) => (
              <MainHeroCard key={hero.id} onClick={() => handleHeroClick(hero)}>
                <MainHeroCardInner>
                  <MainHeroCardUpper>
                    <h2>{hero.name}</h2>
                  </MainHeroCardUpper>
                  <MainHeroCardLower>
                    <p>ID: {hero.id}</p>
                    <StatusBadge $status={hero.status}>{hero.status}</StatusBadge>
                  </MainHeroCardLower>
                  <HeroFrame $rarity={hero.rarity}>
                    {hero.image ? (
                      <HeroImage src={hero.image} alt={hero.name} />
                    ) : (
                      <span style={{ color: 'white' }}>No Image</span>
                    )}
                  </HeroFrame>
                  <MainHeroInfo>
                    <p>Level: {hero.level}</p>
                    <p>Price: {hero.price} SWR</p>
                  </MainHeroInfo>
                </MainHeroCardInner>
              </MainHeroCard>
            ))}
          </MainHeroesWrapper>
        </MainContent>
      </ContentWrapper>
      
      <ModalOverlay $isOpen={isModalOpen} onClick={handleCloseModal}>
        <div onClick={(e) => e.stopPropagation()}>
          {selectedHero && (
            <LikedHeroes 
              hero={selectedHero} 
              onClose={handleCloseModal}
            />
          )}
        </div>
      </ModalOverlay>
    </Background>
  );
}

export default HomePage;