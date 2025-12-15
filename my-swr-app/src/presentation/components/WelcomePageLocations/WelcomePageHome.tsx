
import styled, { css } from 'styled-components';
import { useState } from 'react';

const WelcomePageContainer = styled.div`
  position: absolute;
  width: 17.8%;
  height: 47.9%;
  top: 26.6%;
  left: 2%;
  background-image: url('/assets/town_home.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  &:hover {
    background-image: url('/assets/town_home_hover.png');
  }
`;

const FrameBorderModalMain = css`
  border-style: solid;
  border-image-width: 33px;
  border-image-source: url('/assets/frame_big_external.png');
  border-image-slice: 33 fill;
  border-image-repeat: round;
`;

const WelcomePageHoverSection = styled.div<{ visible: boolean }>`
  width: 90%;
  height: fit-content;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  user-select: none;
  background: rgba(99, 203, 67, 0.95);
  color: #fff;
  border-radius: 8px;
  padding: 12px 10px 8px 10px;
  text-align: center;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  position: absolute;
  ${FrameBorderModalMain}
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.2s ease;
  z-index: 10;
`;

const WelcomePageTitleHome = styled.div`
  display: flex;
  align-items: center;
 
  justify-content: center;
  padding: 8px;
`;

const WelcomePageTitleLeft = styled.div`
  width: 10px;
  height: 60px;
  background-image: url('/assets/building_popup_title_left_side.png');
  background-size: cover;
  background-position: center;
 
`;

const WelcomePageTitleRight = styled.div`
  width: 10px;
  height: 60px;
  background-image: url('/assets/building_popup_title_right_side.png');
  background-size: cover;
  background-position: center;
`;

const WelcomePageTitleCenter = styled.div`
  flex: 1;
  background-size: 100% 100%;
  background-image: url('/assets/building_popup_title_fill.png');
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const WelcomePageDescription = styled.div`
  padding: 10px;
  font-size: 15px;
  color: #bfc9d8;
  line-height: 1.4;
  background : black;
  height: fit-content;
`;

const WelcomePageDescriptionInner = styled.div`
  padding: 10px;
  background : #131414ff;
`;

const WelcomePageHome = () => {
  const [showHover, setShowHover] = useState(false);

  return (
    <WelcomePageContainer
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
    >
      <WelcomePageHoverSection
        visible={showHover}
        onMouseEnter={() => setShowHover(false)}
      >
        <WelcomePageTitleHome>
          <WelcomePageTitleLeft />
          <WelcomePageTitleCenter>Home</WelcomePageTitleCenter>
          <WelcomePageTitleRight />
        </WelcomePageTitleHome>
        <WelcomePageDescription>
        <WelcomePageDescriptionInner>
        Is one of the few places where you feel
        warm and safe
        </WelcomePageDescriptionInner>
        </WelcomePageDescription>
      </WelcomePageHoverSection>
    </WelcomePageContainer>
  );
};

export default WelcomePageHome;