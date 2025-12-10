import styled, { css } from 'styled-components';
import type {LikedHeroesProps} from '../types/HeroTypes';
import HeaderComponent from './Modals/LikedHeroesComponents/HeaderComponent';
import TableComponent from './Modals/LikedHeroesComponents/TableComponent';
import MainHeroComponent from './Modals/LikedHeroesComponents/MainHeroComponent';
import UpperNamingComponent from './Modals/LikedHeroesComponents/UpperNamingComponent';

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






const UpperNamingModul = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 40px;
  
  width: 100%;
  margin-top: 20px;
`;

const HeroName = styled.h2`
  color: #ffffff;

  font-family: 'Open Sans', sans-serif;
  font-weight: 200;
  font-size: 18px;
  text-align: left;
  
  margin: 0;
`;


const HeroStatus = styled.div<{ $status: string }>`
  display: flex;
  align-items: center;
  gap: 17px;
  
  span:first-child {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    text-transform: capitalize;
  }
  
  span:last-child {
    padding: 6px 16px;
    background-color: ${props => {
      switch(props.$status) {
        case 'Active': return '#4caf50';
        case 'Finished': return '#2196f3';
        case 'Cancelled': return '#c41e3a';
        default: return '#757575';
      }
    }};
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    text-transform: capitalize;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;


const LikedHeroes = ({ hero, onClose }: LikedHeroesProps) => {
 
  return (
    <Container>
      <HeaderComponent onClose={onClose} />
      <ScrollWrapper>
        <UpperNamingComponent hero={hero} onClose={onClose} />
        <MainHeroComponent hero={hero} onClose={onClose} />
       <TableComponent hero={hero} onClose={onClose} /> 
      </ScrollWrapper>
    </Container>
  );
};

export default LikedHeroes;