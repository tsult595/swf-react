import styled from 'styled-components';
import WelcomePageHome from '../components/WelcomePageLocations/WelcomePageHome';
import Header from '../components/MainWelcomePageComponents/Header'
import { useState } from 'react';
import LoginForm from '../Modals/MainWelcomePageLoginModul/Register';


const HomePageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  
  background-image: 
  url(${'../../../public/assets/town_background.png'});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  position: relative;
`;

const ModalOverlay = styled.div` 
   position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const MainWelcomePage = () => {
  const [isOpen , setIsOpen] = useState(false);
  return (
    <>
    <HomePageBackground>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <WelcomePageHome />
    </HomePageBackground>
     {isOpen && (
        <ModalOverlay onClick={() => setIsOpen(false)}>
          <div onClick={e => e.stopPropagation()}>
            <LoginForm />
          </div>
        </ModalOverlay>
      )}
    </>
  )
 

}

export default MainWelcomePage