import styled from 'styled-components';

import Divider from '../../../assets/auction_menu_divider.png';

import PrimaryLeftDefault from '../../../assets/primary_button_left.png';
import PrimaryCenterDefault from '../../../assets/primary_button_center.png';
import PrimaryRightDefault from '../../../assets/primary_button_right.png';
import SocialsFrame from '../../../assets/social_button_default.png';
import SocialsFrameHover from '../../../assets/small_button_hover.png';
import SocialFrameActive from '../../../assets/small_button_pressed.png';
import Discord from '../../../assets/social_discord_icon.svg';
import Twitter from '../../../assets/social_twitter_icon.svg';
import AsideBackGround from '../../../assets/auction_menu_background.png';


const AsideLeftContainer = styled.div`
   padding: 40px;

   display: flex;
   flex-direction: column;
   align-items: center;

   width: 282px;
   height: 100vh;
   background-image: url(${AsideBackGround});
`;



const AsideButtonLeft = styled.div`
  width: 30px;
  height: 54px;

  background-image: url(${PrimaryLeftDefault});
  background-size: 100% 100%;
  background-repeat: no-repeat;

 
`;

const AsideButtonCenter = styled.div`
 background-image: url(${PrimaryCenterDefault});
 background-size: 100% 100%;
 background-repeat: no-repeat;

  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AsideButtonRight = styled.div`
  width: 30px;
  height: 54px;

  background-image: url(${PrimaryRightDefault});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  
`;

const AsideButtonContainer = styled.div`
   width: 196px;
   height: 54px;

   display: flex;
   align-items: stretch;
   cursor: pointer;
   transition: transform 0.2s;
   background: url(${PrimaryCenterDefault}) no-repeat
    center;
  background-size: calc(100% - 20px) 100%;
   
   &:hover {
     transform: scale(1.05);
   }
`;

const ButtonText = styled.span`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
    color: #bfcad6ff;
`;

const AsideButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 50px;
  width: 100%;
  height: 45%;
  margin-bottom: 30px;
`;

const AsideButtonDivider = styled.div`
  width: 192px;
  height: 57px;

  background-image: url(${Divider});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 14px 0;
`;

const AsideInfo = styled.ul`
  width: 100%;

  padding: 13px;
  margin: 0;

  list-style: none;
  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 14px;
`;

const RuleItem = styled.li`
  color: #ebe1e1;
  padding: 4px 0;
  
  &::before {
    content: "• ";
    color: #C5D4E3;
    font-weight: bold;
    margin-right: 8px;
  }
`;

const AsideInfoWebSites = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1px;
`;

const AsideInfoWebSiteLink = styled.a`
  width: 40px;
  height: 40px;

  margin-top: 25px;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${SocialsFrame});
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    background-image: url(${SocialsFrameHover});
  }
     &:active {
    transform: translateY(0);
    background-image: url(${SocialFrameActive});
  }
    
`;

const FollowUsText = styled.p`
  color: #bfcad6ff;
  font-size: 14px;
  text-align: left;
  margin-top: 40px;
  
`;


function AsideLeft() {
  return (
    <AsideLeftContainer>
        <AsideButtonWrapper>
            <AsideButtonContainer>
                <AsideButtonLeft /> 
                <AsideButtonCenter>
                  <ButtonText>Buy List</ButtonText>
                </AsideButtonCenter>
                <AsideButtonRight />
            </AsideButtonContainer>
            
            <AsideButtonContainer>
                <AsideButtonLeft /> 
                <AsideButtonCenter>
                  <ButtonText>Sell List</ButtonText>
                </AsideButtonCenter>
                <AsideButtonRight />
            </AsideButtonContainer>
        
          <AsideButtonDivider />
          
            <AsideButtonContainer>
                <AsideButtonLeft /> 
                <AsideButtonCenter>
                  <ButtonText>My Items</ButtonText>
                </AsideButtonCenter>
                <AsideButtonRight />
            </AsideButtonContainer>
        </AsideButtonWrapper>
        
        <AsideInfo>
            <RuleItem>
                Sacrificed items will be after upgrade start
            </RuleItem>
            <RuleItem>
                You need experience to make upgrades
            </RuleItem>
            <RuleItem>
                You could upgrade only 1 item per time
            </RuleItem>
            <RuleItem>
                Time of upgrading progress depends on of sacrificed items
            </RuleItem>
            <RuleItem>
                Etcetera...
            </RuleItem>
            <FollowUsText>Follow us on socials</FollowUsText>     
            <AsideInfoWebSites>
              <AsideInfoWebSiteLink>
                <img src={Discord} alt="Discord" />
              </AsideInfoWebSiteLink>
              <AsideInfoWebSiteLink>
                <img src={Discord} alt="Discord" />
              </AsideInfoWebSiteLink>
              <AsideInfoWebSiteLink>
                <img src={Twitter} alt="Twitter" />
              </AsideInfoWebSiteLink>
              <AsideInfoWebSiteLink>
                <img  src={Discord} alt="Discord" />
              </AsideInfoWebSiteLink>
            </AsideInfoWebSites>
        </AsideInfo>
    </AsideLeftContainer>
  );
}

export default AsideLeft;