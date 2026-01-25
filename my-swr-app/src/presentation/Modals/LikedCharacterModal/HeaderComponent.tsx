import HeaderBorderLeft from '../../../assets/popup_title_left_side.png';
import HeaderBorderRight from '../../../assets/popup_title_right_side.png';
import HeaderBorderCenter from '../../../assets/popup_title_fill.png';
import type { ClosingProps} from '../../../Domain/Entities/HeroTypes';
import SocialsFrameHover from '../../../assets/small_button_hover.png';
import SocialFrameActive from '../../../assets/small_button_pressed.png';
import CloseIcon from '../../../../public/assets/close_icon.svg';
import styled from 'styled-components';

const LikedHeroesHeader = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
`;

const HeaderSectionLeft = styled.div`    
  width: 22px;
  height: 100%;

  background-image: url(${HeaderBorderLeft});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const HeaderSectionCenter = styled.div`    
  flex: 1;
  height: 100%;

  background-image: url(${HeaderBorderCenter});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;


`;

const HeaderSectionRight = styled.div`    
  width: 22px;
  height: 100%;

  background-image: url(${HeaderBorderRight});
  background-size: 100% 100%;
  background-repeat: no-repeat;

`;

const LikedHeroesHeaderTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  flex: 1;
  text-align: center;
`;



const CloseIconImage = styled.div`
    width: 24px;
    height: 24px;
    cursor: pointer;
    background-image: url(${CloseIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
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



const HeaderComponent = ({ onClose } : ClosingProps) => {
  return (
    <LikedHeroesHeader>
      <HeaderSectionLeft />
      <HeaderSectionCenter>
        <LikedHeroesHeaderTitle>Auction Item</LikedHeroesHeaderTitle>
        <AsideInfoWebSiteLink onClick={onClose}>
          <CloseIconImage>
            ✖
          </CloseIconImage>
        </AsideInfoWebSiteLink>
      </HeaderSectionCenter>
      <HeaderSectionRight />
    </LikedHeroesHeader>
  )
}

export default HeaderComponent