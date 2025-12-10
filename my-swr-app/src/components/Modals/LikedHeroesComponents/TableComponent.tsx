import styled from 'styled-components';
import { useState } from 'react';
import type {LikedHeroesProps} from '../../../types/HeroTypes';



const HistoryTableWrapper = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'}; 
`;


const LotHistorySection = styled.div`
  width: 100%;
  padding: 30px;
  background: rgba(0, 0, 0, 0.15);
 
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
  
  &::after {
    content: '🪙';
    font-size: 16px;
  }
`;

const TableComponent = ({ hero , onClose }: LikedHeroesProps) => {
      const [openSections, setOpenSections] = useState({
        auction: true,
        nft: true,
        experience: true,
        create: true,
        table : true
      });
      const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return (
    <LotHistorySection>
          <HistoryHeader
            $isOpen={openSections.table}
            onClick={() => toggleSection('table')}
              >
          
            <h3>Lot History</h3>
          </HistoryHeader>
          <HistoryTableWrapper $isOpen={openSections.table}>
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
              <HistoryTableRow>
                <HistoryTableCell>0</HistoryTableCell>
                <HistoryTableCell>Created auction</HistoryTableCell>
                <HistoryTableCell>0x709...79C8</HistoryTableCell>
                <HistoryTableCell>Auction</HistoryTableCell>
                <HistoryTableCell>
                  <PriceCell>{hero.price}</PriceCell>
                </HistoryTableCell>
                <HistoryTableCell>12/01/2025, 5:31 AM</HistoryTableCell>
              </HistoryTableRow>
            </HistoryTableBody>
          </HistoryTable>
          </HistoryTableWrapper>
        </LotHistorySection>
  )
}

export default TableComponent