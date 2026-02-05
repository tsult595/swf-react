import styled from 'styled-components';
import type {Character } from '../../../Domain/Entities/CharacterTypes';
import { useState } from 'react';
import UserFavoritesModal from '../../Modals/UserFavoritesModal/UserFavoritesModal';



const Card = styled.div`
   background-color: #978b8b;
     &[data-border-blue='true'] {
     border: 5px solid blue;
     }
   border-radius: 8px;   
    padding: 16px;
    margin: 10px;
    width: 500px;
    height: 450px;
    cursor: pointer;
    `;

 const CardHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    height: fit-content;
    background-color: lightgrey;
    `; 
    
  const MainHeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    `;
    
  const MainHeaderSectionImgDiv = styled.div` 
    width: 120px;
    height: 200px;
    background-color: yellow;
   
  `;

  const MainHeaderSectionLeft = styled.div`
    display: flex;
    flex-direction: column;
    
    `;

  const MainHeaderSectionImgDivText = styled.p`
    font-size: 16px;
    color: black;
`;

  const MainHeaderSectionInfoDiv = styled.div`
    display: flex;
    flex: 1 ;
    height: 180px;
    flex-direction: column;
    margin-left: 20px;
    background-color: lightgrey;
    margin-top: 11px;
  `;

  const PeaceUPper = styled.div`
    height: fit-content;
    display: flex;
    gap: 10px;
    margin-top: 10px;
    `;

  const PeaceLower = styled.div`
    height: fit-content;
    display: flex;
    gap: 10px;
    
    `;  

  const MainSectionInfoDivPiece = styled.div`
    height: fit-content;
    width: 155px;
    padding: 5px;
    background-color: black;
    font-size: 14px;
    `;

    const MainSectionInfoDivPieceHeader = styled.h3`
    color: white;
    `;

    const MainSectionInfoDivPieceWrapper = styled.div`
    display: flex;
    gap: 10px;
    `;

    const MainSectionInfoDivPieceLeft = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const MainSectionInfoDivPieceRight = styled.div`
    display: flex;
    flex-direction: column;
    `;

  const TableWrapper = styled.div`
  display: flex;
  background: blue;
  width: 100%;
  background-color: black;
  height: 60px;
  `;

  

  const ModalOverlay = styled.div<{ $isOpen: boolean }>` 
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`; 
    

const UserFavoritesCard = ({ character, addCharacterIsViewed , isViewed}: { character: Character, addCharacterIsViewed: () => void, isViewed: boolean }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <Card key={character.id}  data-border-blue={isViewed} onClick={() => {
                addCharacterIsViewed();
                setIsModalOpen(true);
                  }}>
                    <CardHeader>
                    <h2>Header</h2>
                    </CardHeader>
                    <MainHeaderSection>
                        <MainHeaderSectionLeft>
                    <MainHeaderSectionImgDiv>
                        <p>meow</p>
                    </MainHeaderSectionImgDiv>
                    <MainHeaderSectionImgDivText>Image Section</MainHeaderSectionImgDivText>
                    <MainHeaderSectionImgDivText>Image Section</MainHeaderSectionImgDivText>
                    </MainHeaderSectionLeft>
                    <MainHeaderSectionInfoDiv>
                    <PeaceLower>
                    <MainSectionInfoDivPiece>
                     <MainSectionInfoDivPieceHeader>Info</MainSectionInfoDivPieceHeader>   
                     <MainSectionInfoDivPieceWrapper>
                     <MainSectionInfoDivPieceLeft>
                    <p>Name: {character.name}</p>
                    <p>Rarity: {character.rarity}</p>
                     </MainSectionInfoDivPieceLeft>
                    <MainSectionInfoDivPieceRight>
                   <p>Rarity: {character.rarity}</p>
                     <p>Name: {character.name}</p>
                     </MainSectionInfoDivPieceRight>   
                     </MainSectionInfoDivPieceWrapper>
                    </MainSectionInfoDivPiece>
                      <MainSectionInfoDivPiece>
                     <MainSectionInfoDivPieceHeader>Info</MainSectionInfoDivPieceHeader>   
                     <MainSectionInfoDivPieceWrapper>
                     <MainSectionInfoDivPieceLeft>
                    <p>Name: {character.name}</p>
                    <p>Rarity: {character.rarity}</p>
                     </MainSectionInfoDivPieceLeft>
                    <MainSectionInfoDivPieceRight>
                     <p>Rarity: {character.rarity}</p>
                     <p>Name: {character.name}</p>
                     </MainSectionInfoDivPieceRight>   
                     </MainSectionInfoDivPieceWrapper>
                    </MainSectionInfoDivPiece>
                    </PeaceLower> 
                    <PeaceUPper>
                    <MainSectionInfoDivPiece>
                    <MainSectionInfoDivPieceHeader>Info</MainSectionInfoDivPieceHeader>   
                    <p>Name: {character.name}</p>
                    <p>Rarity: {character.rarity}</p>
                  <p>Level: {character.level}</p>
                    </MainSectionInfoDivPiece>
                    <MainSectionInfoDivPiece>
                    <MainSectionInfoDivPieceHeader>Info</MainSectionInfoDivPieceHeader>   
                    <p>Name: {character.name}</p>
                    <p>Rarity: {character.rarity}</p>
                    <p>Level: {character.level}</p>
                    </MainSectionInfoDivPiece>
                    </PeaceUPper>
                    </MainHeaderSectionInfoDiv>
                    </MainHeaderSection>
                    <TableWrapper>
                    <p>222</p>
                    </TableWrapper>
                 
                </Card>
                
                 <ModalOverlay $isOpen={isModalOpen} onClick={() => { setIsModalOpen(false);}}>
                        <div onClick={(e) => e.stopPropagation()}>
                        <UserFavoritesModal 
                        selectedCharacters={character}
                        onClose={() => 
                        { setIsModalOpen(false); }}
                        
                         />
                        </div>
                    </ModalOverlay>
                </>
  )
}

export default UserFavoritesCard