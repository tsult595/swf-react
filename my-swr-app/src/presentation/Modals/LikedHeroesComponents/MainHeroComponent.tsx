import styled from 'styled-components';
import heroFrameHigh from '../../../assets/character_border_violet.png';
import heroFrameMiddle from '../../../assets/character_border_blue.png';
import heroFrame from '../../../assets/character_border_common.png';
import type {  Hero } from '../../../Domain/Entities/HeroTypes';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../../utils/ApiFetcher';

const MainHeroSection = styled.div`
  width: 100%;
  height: fit-content;
  gap: 30px;
  padding: 30px;

  display: flex;

  background: black;
`;

const HeroSideCardContainer = styled.div`
  width: 26%;
  min-height: 450px;

  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSideCardFrame = styled.div<{ $rarity: string }>`
  width: 100%;
  height: 450px;

  border: 25px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
`;

const HeroSideCardImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const ModalHeroInfoUl = styled.ul`
  width: 100%;
  padding: 13px;
  

  list-style: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 13px;
`;

const ModalHeroInfoItemLi = styled.li`
  color: #ebe1e1;
  padding: 4px 0;
  
  
  &::before {
    content: "• ";
    color: #C5D4E3;
    font-weight: bold;
    margin-right: 8px;
  }
`;

// hero grid items

const HeroFeaturesContainer = styled.div`
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

const HeroFeatureStatusDiv = styled.div`
   width: 100px;
   height: fit-content;

   border-left: 4px solid #ffffffff;
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


const MainHeroComponent = () => {
  const { data: hero } = useSWR<Hero>('selectedHero');
  const [openSections, setOpenSections] = useState({
    auction: true,
    nft: true,
    experience: true,
    create: true,
    table : true
  });

  const { data: fullHero} = useSWR<Hero>(
    hero ? `/heroes/${hero.id}` : null,
    fetcher,
    {
      fallbackData: hero, 
      revalidateOnFocus: false,
    }
  );
      
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
          ...prev,
          [section]: !prev[section]
        }));
      };
         if (!hero) {
        return null;
      }
     
 const displayHero = fullHero || hero;

  return (
    <MainHeroSection>
          <HeroSideCardContainer>
            <HeroSideCardFrame $rarity={displayHero.rarity}>
            <HeroSideCardImage 
            src={`/src/assets/characterAvatars/${hero.fileName}`} 
            alt={hero.name}
            onError={(e) => {
              console.error('Image load error:', hero.fileName);
              e.currentTarget.style.display = 'none';
            }}
          />
            </HeroSideCardFrame>
            <ModalHeroInfoUl>
              <ModalHeroInfoItemLi>The item will be sold by best price at the time ending</ModalHeroInfoItemLi>
              <ModalHeroInfoItemLi>If no one will make a bid, the item will change status to withdraw</ModalHeroInfoItemLi>
            </ModalHeroInfoUl>
          </HeroSideCardContainer>
            
          <HeroFeaturesContainer>
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
                  <HeroFeatureStatusDiv>
                    <span>{hero.status}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Highest bidder</span>
                  <HeroFeatureStatusDiv>
                  <span>0x000...0000</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Highest bid</span>
                  <HeroFeatureStatusDiv>
                  <span>{hero.bid} VVVT</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Your bid</span>
                  <HeroFeatureStatusDiv>
                  <span>0.00 VVVT</span>
                  </HeroFeatureStatusDiv>
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
                  <HeroFeatureStatusDiv>
                  <span>#{hero.id}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Rarity</span>
                  <HeroFeatureStatusDiv>
                  <span>{hero.rarity}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Level</span>
                  <HeroFeatureStatusDiv>
                  <span>{hero.level}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Price</span>
                  <HeroFeatureStatusDiv>
                  <span>{hero.price} SWR</span>
                  </HeroFeatureStatusDiv>
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
                  <HeroFeatureStatusDiv>
                  <span>{displayHero.wins || 0}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Loses</span>
                  <HeroFeatureStatusDiv>
                  <span>{displayHero.loses || 0}</span>
                  </HeroFeatureStatusDiv>
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
                  <HeroFeatureStatusDiv>
                 <span>{displayHero.creator || '0x709...79C8'}</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Create date</span>
                  <HeroFeatureStatusDiv>
                   <span>
                  {displayHero.createDate
                    ? new Date(displayHero.createDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })
                    : 'Dec 11, 2025'}
                </span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
              </InfoFeature>
            </FeatureSection>
          </HeroFeaturesContainer>
        </MainHeroSection>
  )
}

export default MainHeroComponent