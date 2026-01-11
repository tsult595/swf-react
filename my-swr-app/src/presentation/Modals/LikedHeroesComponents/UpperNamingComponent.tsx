import styled from 'styled-components';
// import type { LikedHeroesProps } from '../../../Domain/Entities/HeroTypes';
import type { Hero } from '../../../Domain/Entities/HeroTypes';
import useSWR from 'swr';


const UpperNamingModul = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000000ff;
  padding: 20px 40px;
  width: 100%;
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


const UpperNamingComponent = () => {
  const { data: hero } = useSWR<Hero>('selectedHero');
  if (!hero) return null;
  return (
      <UpperNamingModul>
          <HeroName>{hero.name}</HeroName>
          <HeroStatus $status={hero.status}>
            <span>Auction status</span>
            <span>{hero.status}</span>
          </HeroStatus>
        </UpperNamingModul>
  )
}

export default UpperNamingComponent