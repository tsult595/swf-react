import backgroundImage from '../assets/background.png';
import Header from './Header';
import AsideLeft from './AsideLeft';
import MainContent from './MainContent'; 
import styled from 'styled-components';

const HomePageBackground = styled.div`
  width: 100vw;
  height: 100vh;
  
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.89), rgba(0, 0, 0, 0.83)),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

function HomePage() {
  return (
    <HomePageBackground>
      <Header />
      <ContentWrapper>
        <AsideLeft />
        <MainContent /> 
      </ContentWrapper>
    </HomePageBackground>
  );
}

export default HomePage;