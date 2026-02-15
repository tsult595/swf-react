
import styled from 'styled-components';
import { MysteryBoxPresenter } from '../..';
import { useState } from 'react';
import SomethingCard from './SomethingCard';
import { useUserId } from '../../hooks/useUserId';
import BoughtBoxesCard from './BoughtBoxesCard';
import MysteryBoxPaginationButtons from './MysteryBoxPaginationButtons';





const Container = styled.div`
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  color: white;
  flex-direction: column;
  display: flex;
`;

const CharacterSection = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  border-radius: 15px;
  margin-bottom: 30px;
  position: relative;
  margin: 20px auto;
`;

const LoadingOverlay = styled.div<{ $isError?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.$isError ? 'rgba(239, 68, 68, 0.8)' : 'rgba(0, 0, 0, 0.5)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 1.2rem;
  border-radius: 15px;
  z-index: 10;
  cursor: ${props => props.$isError ? 'pointer' : 'default'};
`;


const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #ffd700;
  font-size: 1.2rem;
`;




const Something = () => {
  const userId = useUserId();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const {data, error: boxesError, isValidating, isLoading: boxesLoading, mutate: mutateBoxes}
   = MysteryBoxPresenter.useGetAllMystoryBoxes(currentPage, limit);
   
  const boxes = data?.items;
  console.log(boxes);
  const totalPages = data ? Math.ceil(data.total / limit) : 1;

   const [inputValue, setInputValue] = useState<string>("");
   const [addNewText, setAddNewText] = useState<string[]>([]);
   const [showBoughtBoxes, setShowBoughtBoxes] = useState(false);
  
  const boughtBoxes = boxes?.filter(box => box.ownerId === userId) || [];

   const handleAddNew = () => {
    if(inputValue.trim() !== ''){
      setAddNewText([inputValue, ...addNewText]);
      setInputValue('');
    }
   }

   const handleDelete = (index: number) => {
    const newText = addNewText.filter((_, i) => i !== index);
    setAddNewText(newText);
   }
   
  return (
    <>
    <Container>
      {boxesLoading && <LoadingWrapper>Loading items...</LoadingWrapper>}
         {boxesLoading && <LoadingWrapper>Loading characters...</LoadingWrapper>}

         <MysteryBoxPaginationButtons 
           currentPage={currentPage} 
           totalPages={totalPages} 
           onPageChange={setCurrentPage} 
         />

      <CharacterSection>
      {
        boxes?.map((box)=>(
          <SomethingCard key={box.id} box={box} mutateBoxes={mutateBoxes} />
        ))
      }
      {isValidating && !boxesLoading && (
        <LoadingOverlay>Загрузка новых данных...</LoadingOverlay>
      )}
      {boxesError && !isValidating && (
        <LoadingOverlay $isError onClick={() => mutateBoxes()}>
          Ошибка загрузки. Нажмите для повторной попытки.
        </LoadingOverlay>
      )}
      </CharacterSection>

       <MysteryBoxPaginationButtons 
           currentPage={currentPage} 
           totalPages={totalPages} 
           onPageChange={setCurrentPage} 
         />

       <input type="text" 
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
       />
       <button onClick={()=>handleAddNew()}>add</button>
       <ul>
        {addNewText.map((text,index)=>(<><button onClick={()=>handleDelete(index)}>delete</button><li key={index}>{text}</li></>))}
       </ul>
       <button onClick={() => setShowBoughtBoxes(!showBoughtBoxes)}>Show Bought Boxes</button>
      
    </Container>

     
    
      {showBoughtBoxes &&
        boughtBoxes.map((box)=>(
          <BoughtBoxesCard key={box.id} box={box} mutateBoxes={mutateBoxes} />
        ))
      }

    </>
  )
}

export default Something