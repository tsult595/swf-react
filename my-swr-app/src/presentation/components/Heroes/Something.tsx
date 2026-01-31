
import styled from 'styled-components';
import { MysteryBoxPresenter } from '../..';
import { useState } from 'react';
import SomethingCard from './SomethingCard';



const Container = styled.div`
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  color: white;
  flex-direction: column;
  display: flex;
`;

const HeroSection = styled.div`
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
  const {data : boxes , error: boxesError, isValidating, isLoading: boxesLoading, mutate: mutateBoxes} = MysteryBoxPresenter.useGetAllMystoryBoxes();
   const [inputValue, setInputValue] = useState<string>("");
   const [addNewText, setAddNewText] = useState<string[]>([]);
  

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
         {boxesLoading && <LoadingWrapper>Loading heroes...</LoadingWrapper>}
      <HeroSection>
      {
        boxes?.map((box)=>(
          <SomethingCard key={box.id} box={box} />
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
      </HeroSection>
       <input type="text" 
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
       />
       <button onClick={()=>handleAddNew()}>add</button>
       <ul>
        {addNewText.map((text,index)=>(<><button onClick={()=>handleDelete(index)}>delete</button><li key={index}>{text}</li></>))}
       </ul>
    </Container>

    </>
  )
}

export default Something