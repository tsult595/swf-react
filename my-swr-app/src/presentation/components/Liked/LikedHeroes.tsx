import styled, { css } from 'styled-components';
import type {LikedHeroesProps} from '../../../Domain/Entities/HeroTypes';
import HeaderComponent from '../../Modals/LikedHeroesComponents/HeaderComponent';
import TableComponent from '../../Modals/LikedHeroesComponents/TableComponent';
import MainHeroComponent from '../../Modals/LikedHeroesComponents/MainHeroComponent';
import UpperNamingComponent from '../../Modals/LikedHeroesComponents/UpperNamingComponent';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import useSWR from 'swr';

const FrameBorderModalMain = css`
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

  ${FrameBorderModalMain}
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



const LikedHeroes = ({ onClose }: LikedHeroesProps) => {
  const { data: hero } = useSWR<Hero>('selectedHero');
 
  return (
    <Container>
      <HeaderComponent  onClose={onClose} />
      <ScrollWrapper>
        {hero && (
          <>
            <UpperNamingComponent />
            <MainHeroComponent />
            <TableComponent  />
          </>
        )}
      </ScrollWrapper>
    </Container>
  );
};

export default LikedHeroes;