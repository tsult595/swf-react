import styled, { css } from 'styled-components';
// import MainBorderModal from '../asse';
import HeaderBorderLeft from '../assets/popup_title_left_side.png';
import HeaderBorderRight from '../assets/popup_title_right_side.png';
import HeaderBorderCenter from '../assets/popup_title_fill.png';
import SocialsFrameHover from '../assets/small_button_hover.png';
import SocialFrameActive from '../assets/small_button_pressed.png';
import heroFrameHigh from '../assets/character_border_violet.png';
import heroFrameMiddle from '../assets/character_border_blue.png';
import heroFrame from '../assets/character_border_common.png';
import CloseIcon from '../../public/assets/close_icon.svg';

const FrameBorderModalTwo = css`
  border-style: solid;
  border-image-width : 33px;
  border-image-source: url('/assets/frame_16_background.png');
  border-image-slice: 33 fill;
  border-image-repeat: round;
`;

const Container = styled.div`
  width: 1200px;
  height: 800px;

  margin: auto;
  margin-top: 30px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${FrameBorderModalTwo}
`;

const LikedHeroesHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
`;

const HeaderSectionLeft = styled.div`    
  width: 22px;
  height: 100%;
  background-image: url(${HeaderBorderLeft});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

const HeaderSectionCenter = styled.div`    
  flex: 1;
  height: 100%;
  background-image: url(${HeaderBorderCenter});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const HeaderSectionRight = styled.div`    
  width: 22px;
  height: 100%;
  background-image: url(${HeaderBorderRight});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

const LikedHeroesHeaderTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  flex: 1;
  text-align: center;
`;

const ScrollWrapper = styled.div`
  flex: 1;
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

const MainHeroSection = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 30px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.15);
`;

const HeroSideCard = styled.div`
  width: 25%;
  min-height: 450px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroFeatures = styled.div`
  width: 68%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  height: fit-content;
`;

const FeatureSection = styled.div`
  background: #13171f;
  border: 1px solid #1f242c;
  border-radius: 6px;
  padding: 10px 14px;
  margin-top: 35px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  &::before {
     content: "🞃";
    font-size: 14px;
    transform: rotate(180deg);
    color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    margin: 0;
    font-size: 17px;
    color: rgba(255, 255, 255, 0.85);
    font-weight: 500;
  }
   
`;

const InfoGrid = styled.div`
  display: flex;
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
  width: 250px;
  height: 450px;
  border: 25px solid transparent;
  border-image: url(${props => getFrameByRarity(props.$rarity)}) 25 fill;
  border-image-repeat: stretch;
  transition: all 0.3s ease;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AsideInfoWebSiteLink = styled.a`
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${SocialsFrameHover});
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    transform: scale(1.1);
    background-image: url(${SocialFrameActive});
  }
  
  &:active {
    transform: translateY(2px);
    background-image: url(${SocialFrameActive});
  }
`;

const ModalHeroInfo = styled.ul`
  width: 100%;
  padding: 13px;
  margin: 0;
  list-style: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 13px;
`;

const ModalHeroInfoItem = styled.li`
  color: #ebe1e1;
  padding: 4px 0;
  
  &::before {
    content: "• ";
    color: #C5D4E3;
    font-weight: bold;
    margin-right: 8px;
  }
`;

const HeroName = styled.h2`
  color: #ffffff;
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 18px;
  text-align: left;
  margin: 0;
`;

const LotHistorySection = styled.div`
  width: 100%;
  padding: 30px;
  background: rgba(0, 0, 0, 0.15);
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  &::before {
    content: "▼";
    font-size: 14px;
    transform: rotate(180deg);
    color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    margin: 0;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    text-transform: capitalize;
  }
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HistoryTableHead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HistoryTableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const HistoryTableHeader = styled.th`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  padding: 12px 16px;
  
  &:first-child {
    padding-left: 0;
  }
  
  &:last-child {
    padding-right: 0;
    text-align: right;
  }
`;

const HistoryTableBody = styled.tbody``;

const HistoryTableCell = styled.td`
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  padding: 16px;
  
  &:first-child {
    padding-left: 0;
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:last-child {
    padding-right: 0;
    text-align: right;
  }
`;

const PriceCell = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::after {
    content: '🪙';
    font-size: 16px;
  }
`;

const UpperNamingModul = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const HeroStatus = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 12px;
  
  span:first-child {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    text-transform: capitalize;
  }
  
  span:last-child {
    padding: 6px 16px;
    background-color: ${props => {
      switch(props.$status) {
        case 'Active': return '#4caf50';
        case 'Finished': return '#2196f3';
        case 'Cancelled': return '#c41e3a';
        default: return '#757575';
      }
    }};
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    text-transform: capitalize;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const HeroFeatureStatusDiv = styled.div`
   width: 100px;
   height: fit-content;
   border-left: 4px solid #ffffffff;
`;

const CloseIconImage = styled.div`
    width: 24px;
    height: 24px;
    background-image: url(${CloseIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

interface LikedHeroesProps {
  hero?: {
    id: number;
    name: string;
    image: string;
    rarity: string;
    level: number;
    price: number;
    bid: number;
    status: string;
  };
  onClose: () => void;
}

const LikedHeroes = ({ hero, onClose }: LikedHeroesProps) => {
     if (!hero) {
    return null;
  }
  return (
    <Container>
      <LikedHeroesHeader>
        <HeaderSectionLeft />
        <HeaderSectionCenter>
          <LikedHeroesHeaderTitle>Auction Item</LikedHeroesHeaderTitle>
          <AsideInfoWebSiteLink onClick={onClose}>
            <CloseIconImage>
            </CloseIconImage>
          </AsideInfoWebSiteLink>
        </HeaderSectionCenter>
        <HeaderSectionRight />
      </LikedHeroesHeader>
      
      <ScrollWrapper>
        <UpperNamingModul>
          <HeroName>{hero.name}</HeroName>
          <HeroStatus $status={hero.status}>
            <span>Auction status</span>
            <span>{hero.status}</span>
          </HeroStatus>
        </UpperNamingModul>
        
        <MainHeroSection>
          <HeroSideCard>
            <HeroFrame $rarity={hero.rarity}>
              <HeroImage src={hero.image} alt={hero.name} />
            </HeroFrame>
            <ModalHeroInfo>
              <ModalHeroInfoItem>The item will be sold by best price at the time ending</ModalHeroInfoItem>
              <ModalHeroInfoItem>If no one will make a bid, the item will change status to withdraw</ModalHeroInfoItem>
            </ModalHeroInfo>
          </HeroSideCard>
            
          <HeroFeatures>
            <FeatureSection>
              <SectionHeader>
                <h3>Auction Info</h3>
              </SectionHeader>
              <InfoGrid>
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
              </InfoGrid>
            </FeatureSection>

            <FeatureSection>
              <SectionHeader>
                <h3>NFT Info</h3>
              </SectionHeader>
              <InfoGrid>
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
              </InfoGrid>
            </FeatureSection>

            <FeatureSection>
              <SectionHeader>
                <h3>Experience</h3>
              </SectionHeader>
              <InfoGrid>
                <InfoRow>
                  <span>Wins</span>
                  <HeroFeatureStatusDiv>
                  <span>0</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Loses</span>
                  <HeroFeatureStatusDiv>
                  <span>0</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
              </InfoGrid>
            </FeatureSection>

            <FeatureSection>
              <SectionHeader>
                <h3>NFT Create Info</h3>
              </SectionHeader>
              <InfoGrid>
                <InfoRow>
                  <span>Creator</span>
                  <HeroFeatureStatusDiv>
                  <span>0x709...79C8</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
                <InfoRow>
                  <span>Create date</span>
                  <HeroFeatureStatusDiv>
                  <span>Dec 1, 2025</span>
                  </HeroFeatureStatusDiv>
                </InfoRow>
              </InfoGrid>
            </FeatureSection>
          </HeroFeatures>
        </MainHeroSection>
        
        <LotHistorySection>
          <HistoryHeader>
            <h3>Lot History</h3>
          </HistoryHeader>
          <HistoryTable>
            <HistoryTableHead>
              <HistoryTableRow>
                <HistoryTableHeader>№</HistoryTableHeader>
                <HistoryTableHeader>Type</HistoryTableHeader>
                <HistoryTableHeader>From</HistoryTableHeader>
                <HistoryTableHeader>To</HistoryTableHeader>
                <HistoryTableHeader>Price</HistoryTableHeader>
                <HistoryTableHeader>Date</HistoryTableHeader>
              </HistoryTableRow>
            </HistoryTableHead>
            <HistoryTableBody>
              <HistoryTableRow>
                <HistoryTableCell>0</HistoryTableCell>
                <HistoryTableCell>Created auction</HistoryTableCell>
                <HistoryTableCell>0x709...79C8</HistoryTableCell>
                <HistoryTableCell>Auction</HistoryTableCell>
                <HistoryTableCell>
                  <PriceCell>{hero.price}</PriceCell>
                </HistoryTableCell>
                <HistoryTableCell>12/01/2025, 5:31 AM</HistoryTableCell>
              </HistoryTableRow>
            </HistoryTableBody>
          </HistoryTable>
        </LotHistorySection>
      </ScrollWrapper>
    </Container>
  );
};

export default LikedHeroes;