import styled from 'styled-components';

import HeaderBackGround from '../assets/page_header_background.png';
import GameName from '../assets/logo.png';
import ButtonHeaderDefault from '../assets/page_header_menu_button_default.png';
import ButtonHeaderHover from '../assets/page_header_menu_button_hover.png';
import HeaderLeftDefault from '../assets/page_header_connect_button_default.png';
import HeaderLeftHover from '../assets/page_header_connect_button_hover.png';
import ButtonHeaderpressed from '../assets/page_header_menu_button_pressed.png';
import MainHeaderButtonTextFrameLeftImg from '../assets/page_header_left_menu_item.png';
import MainHeaderButtonTextFrameRightImg from '../assets/page_header_right_menu_item.png';

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 90px;
  padding: 32px;
  background-image: url(${HeaderBackGround});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MainHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainHeaderButton = styled.button`
  width: 112px;
  height: 80px;
  background-image: url(${ButtonHeaderDefault});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(127,137,152);
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-image: url(${ButtonHeaderHover});
    color: white;
  }
       &:active {
    transform: translateY(0);
    background-image: url(${ButtonHeaderpressed});
  }
`;

const MainHeaderButtonText = styled.h1`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
`;

const MainHeaderButtonTextFrameLeft = styled.div`
    width: 25px;
    height: 100%;
    background-image: url(${MainHeaderButtonTextFrameLeftImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;
const MainHeaderButtonTextFrameRight = styled.div`
   
    width: 25px;
    height: 100%;
    background-image: url(${MainHeaderButtonTextFrameRightImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

const MainHeaderGameName = styled.div`
  width: 360px;
  height: 80px;
  background-image: url(${GameName});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 36px;
  : hover{
    cursor: pointer;
    
  }
`;



const MainHeaderOptionsButtonRight = styled.div`
  width: 229px;
  height: 61px;
  background-image: url(${HeaderLeftDefault});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
     background-image: url(${HeaderLeftHover});
  }
`;

function Header() {
  return (
    <MainHeader>
      <MainHeaderLeft>
        <MainHeaderGameName>
        </MainHeaderGameName>
        <MainHeaderButtonTextFrameLeft />
        <MainHeaderButton>
          <MainHeaderButtonText>Game</MainHeaderButtonText>
        </MainHeaderButton>
        <MainHeaderButton>
          <MainHeaderButtonText>Auction</MainHeaderButtonText>
        </MainHeaderButton>
        <MainHeaderButton>
          ...
        </MainHeaderButton>
        <MainHeaderButtonTextFrameRight />
      </MainHeaderLeft>
      <MainHeaderOptionsButtonRight>
      </MainHeaderOptionsButtonRight>
    </MainHeader>
  );
}

export default Header;