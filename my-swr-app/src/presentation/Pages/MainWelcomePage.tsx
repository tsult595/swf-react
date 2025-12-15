import styled from 'styled-components';
import WelcomePageHome from '../components/WelcomePageLocations/WelcomePageHome';

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



const MainWelcomePage = () => {
  return (
    <HomePageBackground>
      <WelcomePageHome />
    </HomePageBackground>
  )
}

export default MainWelcomePage