import styled from 'styled-components';
import { useState } from 'react';
import type { Character } from '../../../Domain/Entities/HeroTypes';
import { useGetHeroHistory } from '../../heroes';



const HistoryTableWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'}; 
  overflow: hidden;
  transition: all 0.3s ease;
`;

const LotHistorySection = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 30px;
    background: #000000ff;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HistoryHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: ${props => props.$isOpen ? '20px' : '0'}; 
  cursor: pointer; 
  user-select: none;
  transition: margin-bottom 0.3s ease; 

  &::before {
    content: "▼";
    font-size: 14px;
    transform: ${props => props.$isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
    transition: transform 0.3s ease; 
    color: rgba(255, 255, 255, 0.5);
  }

  h3 {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    text-transform: capitalize;
  }
`;

const HistoryTableHead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HistoryTableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const HistoryTableHeader = styled.th`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 400;
  padding: 12px 16px;
  text-align: left;
  
  &:first-child {
    padding-left: 0;
  }
  
  &:last-child {
    padding-right: 0;
    text-align: right;
  }
`;

const HistoryTableBody = styled.tbody``;

const HistoryTableCell = styled.td`
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  padding: 16px;
  
  &:first-child {
    padding-left: 0;
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:last-child {
    padding-right: 0;
    text-align: right;
  }
`;

const PriceCell = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
  
  &::after {
    content: '🪙';
    font-size: 16px;
  }
`;

const LoadingText = styled.div`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

const ErrorText = styled.div`
  color: #ff4757;
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

const EmptyText = styled.div`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

const TableComponent = ({ character }: { character: Character }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: history, error, isLoading } = useGetHeroHistory(character?.id);

  console.log('Fetching history for character:', history) 

  const toggleSection = () => {
    setIsOpen(prev => !prev);
  };

  if (!character) return null;

  return (
    <LotHistorySection>
      <HistoryHeader
        $isOpen={isOpen}
        onClick={toggleSection}
      >
        <h3>Lot History</h3>
      </HistoryHeader>
      
      <HistoryTableWrapper $isOpen={isOpen}>
    
        {isLoading && <LoadingText>Loading history...</LoadingText>}
        

        {error && <ErrorText>Failed to load history. Please try again.</ErrorText>}
        
        
        {!isLoading && !error && history && history.length === 0 && (
          <EmptyText>No history available for this hero</EmptyText>
        )}
        
      
        {!isLoading && !error && history && history.length > 0 && (
          <HistoryTable>
            <HistoryTableHead>
              <HistoryTableRow>
                <HistoryTableHeader>№</HistoryTableHeader>
                <HistoryTableHeader>Type</HistoryTableHeader>
                <HistoryTableHeader>From</HistoryTableHeader>
                <HistoryTableHeader>To</HistoryTableHeader>
                <HistoryTableHeader>Price</HistoryTableHeader>
                <HistoryTableHeader>Date</HistoryTableHeader>
              </HistoryTableRow>
            </HistoryTableHead>
            <HistoryTableBody>
              {history.map((item, index) => (
                <HistoryTableRow key={item.id}>
                  <HistoryTableCell>{index}</HistoryTableCell>
                  <HistoryTableCell>{item.type}</HistoryTableCell>
                  <HistoryTableCell>{item.from}</HistoryTableCell>
                  <HistoryTableCell>{item.to}</HistoryTableCell>
                  <HistoryTableCell>
                    <PriceCell>{item.price}</PriceCell>
                  </HistoryTableCell>
                  <HistoryTableCell>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </HistoryTableCell>
                </HistoryTableRow>
              ))}
            </HistoryTableBody>
          </HistoryTable>
        )}
      </HistoryTableWrapper>
    </LotHistorySection>
  );
};

export default TableComponent;