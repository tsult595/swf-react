import styled from 'styled-components';
import PrimaryCenterDefault from '../../../assets/primary_button_center.png';
import PrimaryLeftDefault from '../../../assets/primary_button_left.png';
import PrimaryRightDefault from '../../../assets/primary_button_right.png';




const HeaderContainer = styled.div`
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
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

const ButtonText = styled.span`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
    color: #bfcad6ff;
`;

interface HeaderProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ setIsOpen}) => {

  return (
    <HeaderContainer>
        <AsideButtonContainer onClick={() => setIsOpen(prev => !prev)}>
                <AsideButtonLeft /> 
                <AsideButtonCenter>
                  <ButtonText>Login</ButtonText>
                </AsideButtonCenter>
                <AsideButtonRight />
            </AsideButtonContainer>
    </HeaderContainer>
  )
}

export default Header