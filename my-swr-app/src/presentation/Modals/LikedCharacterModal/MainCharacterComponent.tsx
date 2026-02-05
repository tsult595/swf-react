import styled from 'styled-components';
import characterFrameHigh from '../../../assets/character_border_violet.png';
import characterFrameMiddle from '../../../assets/character_border_blue.png';
import characterFrame from '../../../assets/character_border_common.png';
import { useState} from 'react';
import type { Character } from '../../../Domain/Entities/CharacterTypes';


const MainCharacterSection = styled.div`
  width: 100%;
  height: fit-content;
  gap: 30px;
  padding: 30px;

  display: flex;

  background: black;
`;

const CharacterSideCardContainer = styled.div`
  width: 26%;
  min-height: 450px;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterSideCardFrame = styled.div<{ $rarity: string }>`
  width: 100%;
  height: 450px;

  border: 25px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
`;

const CharacterSideCardImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const ModalCharacterInfoUl = styled.ul`
  width: 100%;
  padding: 13px;
  

  list-style: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 13px;
`;

const ModalCharacterInfoItemLi = styled.li`
  color: #ebe1e1;
  padding: 4px 0;
  
  
  &::before {
    content: "• ";
    color: #C5D4E3;
    font-weight: bold;
    margin-right: 8px;
  }
`;

// character grid items

const CharacterFeaturesContainer = styled.div`
  width: 68%;
  height: fit-content;
  background: #000000ff;
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 15px;
`;

const SectionHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;

  gap: 10px;
  margin-bottom: ${props => props.$isOpen ? '20px' : '0'};
  padding-bottom: ${props => props.$isOpen ? '0' : '15px'}; 
  cursor: pointer;
  user-select: none;
  transition: margin-bottom 0.3s ease, padding-bottom 0.3s ease; 
  
  &::before {
    content: "▼";
    font-size: 14px;
    transform: ${props => props.$isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
    transition: transform 0.3s ease;
    color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    font-size: 17px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }
`;


const FeatureSection = styled.div<{ $isOpen: boolean }>`
  background: rgb(18,20,26);
  border: 1px solid #1f242c;

  border-radius: 6px;
  padding: 15px 14px;
  margin-top: 35px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const InfoFeature = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'}; 
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
 

  gap: 18px;

  span:first-child {
    color: rgba(255, 255, 255, 0.55);
    font-size: 14px;
  }

  span:last-child {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    padding-left: 12px;
    border-left: 2px solid rgba(143, 180, 199, 0.4);
  }
`;

const CharacterFeatureStatusDiv = styled.div`
   width: 100px;
   height: fit-content;

   border-left: 4px solid #ffffffff;
`;

const getFrameByRarity = (rarity: string) => {
  switch (rarity) {
    case 'High':
      return characterFrameHigh;
    case 'Middle':
      return characterFrameMiddle;
    default:
      return characterFrame;
  }
};


const MainCharacterComponent = ({ character }: { character: Character }) => {
  // todo Record doljen bit z 4 obyektov

  const [openSections, setOpenSections] = useState({
    auction: true,
    nft: true,
    experience: true,
    create: true,
    table : true
  });

//  uprostit togglesection
      
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
          ...prev,
          [section]: !prev[section]
        }));
      };
         if (!character) {
        return null;
      }
     

  return (
    <MainCharacterSection>
          <CharacterSideCardContainer>
            <CharacterSideCardFrame $rarity={character.rarity}>
            <CharacterSideCardImage 
            src={`/src/assets/characterAvatars/${character.fileName}`} 
            alt={character.name}
            onError={(e) => {
              console.error('Image load error:', character.fileName);
              e.currentTarget.style.display = 'none';
            }}
          />
            </CharacterSideCardFrame>
            <ModalCharacterInfoUl>
              <ModalCharacterInfoItemLi>The item will be sold by best price at the time ending</ModalCharacterInfoItemLi>
              <ModalCharacterInfoItemLi>If no one will make a bid, the item will change status to withdraw</ModalCharacterInfoItemLi>
            </ModalCharacterInfoUl>
          </CharacterSideCardContainer>
            
          <CharacterFeaturesContainer>
            <FeatureSection $isOpen={openSections.auction}>
              <SectionHeader 
                $isOpen={openSections.auction}
                onClick={() => toggleSection('auction')}
              >
                <h3>Auction Info</h3>
              </SectionHeader>
              <InfoFeature $isOpen={openSections.auction}>
                <InfoRow>
                  <span>Auction Status</span>
                  <CharacterFeatureStatusDiv>
                    <span>{character.status}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Highest bidder</span>
                  <CharacterFeatureStatusDiv>
                  <span>0x000...0000</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Highest bid</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.bid} VVVT</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Your bid</span>
                  <CharacterFeatureStatusDiv>
                  <span>0.00 VVVT</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
              </InfoFeature>
            </FeatureSection>

            <FeatureSection $isOpen={openSections.nft}>
                <SectionHeader 
                $isOpen={openSections.nft}
                onClick={() => toggleSection('nft')}
              >
                <h3>NFT Info</h3>
              </SectionHeader>
              <InfoFeature $isOpen={openSections.nft}>
                <InfoRow>
                  <span>ID</span>
                  <CharacterFeatureStatusDiv>
                  <span>#{character.id}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Rarity</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.rarity}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Level</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.level}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Price</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.price} SWR</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
              </InfoFeature>
            </FeatureSection>

            <FeatureSection $isOpen={openSections.experience}>
                <SectionHeader 
                $isOpen={openSections.experience}
                onClick={() => toggleSection('experience')}
              >
                <h3>Experience</h3>
              </SectionHeader>
              <InfoFeature $isOpen={openSections.experience}>
                <InfoRow>
                  <span>Wins</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.wins || 0}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Loses</span>
                  <CharacterFeatureStatusDiv>
                  <span>{character.loses || 0}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
              </InfoFeature>
            </FeatureSection>

            <FeatureSection $isOpen={openSections.create}>
                <SectionHeader 
                $isOpen={openSections.create}
                onClick={() => toggleSection('create')}
                >
                <h3>NFT Create Info</h3>
              </SectionHeader>
              <InfoFeature $isOpen={openSections.create}>
                <InfoRow>
                  <span>Creators</span>
                  <CharacterFeatureStatusDiv>
                 <span>{character.creator || '0x709...79C8'}</span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Create date</span>
                  <CharacterFeatureStatusDiv>
                   <span>
                  {character.createDate
                    ? new Date(character.createDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'Dec 11, 2025'}
                </span>
                  </CharacterFeatureStatusDiv>
                </InfoRow>
              </InfoFeature>
            </FeatureSection>
          </CharacterFeaturesContainer>
        </MainCharacterSection>
  )
}

export default MainCharacterComponent