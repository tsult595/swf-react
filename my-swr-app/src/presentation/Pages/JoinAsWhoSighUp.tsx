import styled from 'styled-components';

const Container = styled.div`
    width: 90%;
    height: 100vh;
    padding: 20px;
    height: 100vh;
    margin: 0 auto;
    `; 

    const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 340px;
    margin-top: 13rem;
    `;

    const Exitbutton = styled.div`
    padding: 10px 20px;
    height: fit-content;
    width: fit-content;
    background: none;
    border: 2px solid gray;
    color: green;
    border-radius: 5px;
    cursor: pointer;
    `;

    const TextWrapper = styled.div`
    padding: 10px;
    height: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    width: 50%;
    display: flex;
    gap: 10px;
`;

const Title = styled.h1`
    color: black;
    font-size: 24px;
    margin-bottom: 20px;
    `;

 const TextCard = styled.div`
    border: 2px solid gray; 
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;  
    
    &:hover{
        border: 4px solid black;
        }
    `;
 
const TextCardHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    height: fit-content;
    margin-bottom: 50px;
    `;
const CheckBoxInput = styled.input`
    width: 50px;
    height: 50px;
    cursor: pointer;
    
    `;
 
 const ApplyButton = styled.button`
    padding: 10px 20px;
    background: none;
    border: 2px solid gray;
    color: green;
    border-radius: 5px;
    cursor: pointer;
    
    `;   

const JoinAsWhoSighUp = () => {
  return (
    <>
    <Container>
        <Exitbutton>Exit</Exitbutton>
        <TextContainer>
        <Title>Join As Who</Title>
        <TextWrapper>
        <TextCard>
        <TextCardHeader>
            <p>O</p>
            <CheckBoxInput type="radio" />
        </TextCardHeader>
        <h2>I'm a client, hiring for a project</h2>
        </TextCard>
        <TextCard>
        <TextCardHeader>
            <p>O</p>
            <CheckBoxInput type="radio" />
        </TextCardHeader>
        <h2>I'm a freelancer, looking for work</h2>
        </TextCard>
        </TextWrapper>
        <ApplyButton>Apply</ApplyButton>
        <p>Already have an account? <a href="/login">Login</a></p>
        </TextContainer>
    </Container>
    </>
  )}

export default JoinAsWhoSighUp