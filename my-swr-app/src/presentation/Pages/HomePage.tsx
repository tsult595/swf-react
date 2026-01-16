import backgroundImage from '../../assets/background.png';
import Header from '../components/HomePageComponents/HomePageHeader';
import AsideLeft from '../components/HomePageComponents/HomePageAsideLeft';
import HomePageMainContent from '../components/HomePageComponents/HomePageMainContent'; 
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
        <HomePageMainContent /> 
      </ContentWrapper>
    </HomePageBackground>
  );
}

export default HomePage;