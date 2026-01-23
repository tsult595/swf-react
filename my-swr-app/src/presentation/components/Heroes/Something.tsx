
import styled from 'styled-components';
import { MysteryBoxPresenter } from '../..';
import { useSelectedOnes } from '../../hooks/useSelectedOnes';
import { useState } from 'react';



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

const HeroCard = styled.div<{ $rarity: string; $isDark?: boolean; $isOpen?: boolean }>`
  width: 250px;
  height: 350px;
  border: 5px solid ${props => props.$isOpen ? 'blue' : 'transparent'};
  border-image-repeat: stretch;
  border-radius: 10px;
  background: ${props => props.$isDark ? 'white' : 'yellow'};
  color: black;
`;


const Button = styled.button<{$isColorBlue?: boolean}>`
  padding: 8px 16px;
  background: ${props => props.$isColorBlue ? 'blue' : 'gray'};
  color: white;
  `;

// const ErrorWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   background: rgba(239, 68, 68, 0.1);
//   border: 1px solid #ef4444;
//   border-radius: 10px;
//   color: #ef4444;
  
//   button {
//     margin-top: 10px;
//     padding: 8px 16px;
//     background: #ef4444;
//     color: white;
//     border: none;
//     border-radius: 5px;
//     cursor: pointer;
    
//     &:hover {
//       background: #dc2626;
//     }
//   }
// `;

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
   const { setSelectedBox } = useSelectedOnes();
   console.log("Boxes data in Something component:", boxes);
   const [inputValue, setInputValue] = useState<string>("");
   const [addNewText, setAddNewText] = useState<string[]>([]);
   const [darkMode, setDarkMode] = useState <Record<number, boolean>>({});
   const [selectedBoxId, setSelectedBoxId] = useState<number | null>(null);
   const [shapeMode, setShapeMode] = useState<Record<number, boolean>>({});

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
          <HeroCard 
            key={box.id} 
            $rarity={box.rarity} 
            $isDark={darkMode[box.id]} 
            $isOpen={selectedBoxId === box.id}
            onClick={() => {
              setSelectedBoxId(box.id);
              setSelectedBox(box);
            }}
          >
            <button onClick={(e) => { e.stopPropagation(); setDarkMode(prev => ({ ...prev, [box.id]: !prev[box.id] })); }}>
              dark
            </button>
            <Button onClick={(e)=>{e.stopPropagation(); 
            setShapeMode(prev => ({ ...prev, [box.id]: !prev[box.id] }));
            }} $isColorBlue={shapeMode[box.id]}>shape</Button>
            <p>{box.name}</p>
            <p>Rarity: {box.rarity}</p>
          </HeroCard>
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