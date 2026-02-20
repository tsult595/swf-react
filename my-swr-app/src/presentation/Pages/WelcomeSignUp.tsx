import styled from 'styled-components';

const Container = styled.div`
    width: 80%;
    height: 100vh;
    padding: 20px;
    height: 100vh;
    margin: 0 auto;
     width: 95%;
    `;

   const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 800px;
    width: 60%;
    padding: 20px;
    `; 
    
   const Title = styled.h1`
    color: #1d1d1d;
    font-size: 28px;
    margin-bottom: 30px;
    text-align: left;
`; 

const TitleP = styled.p`
    font-size: 16px;
    color: #1d1d1d;
    margin-bottom: 20px;
    `;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 20px;
`;    
    
const CheckBoxInputCheck = styled.input`
    width: 50px;
    height: 50px;
    cursor: pointer;
    `;

const TextInput = styled.input`
    width: 100%;
    padding: 12px 14px;
    border: 2px solid #d5d5d5;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
`; 

const TextInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-bottom: 20px;
`;

const TextInputRow = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    `;

const ButtonWrapper = styled.div`
     display: flex;
     justify-content: flex-end;
     width: 100%;
     `;
        

const Button = styled.button`
    padding: 10px 20px;
    background: none;
    border: 2px solid gray;
    color: green;
    margin: 0px;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        border: 4px solid black;
        `;

const Row = styled.div`
    display: flex;
    gap: 16px;
    width: fit-content;
    align-items: center;
    `;
 
 const WelcomeSignUp = () => {
   return (
     <Container>
       <TextContainer>
        <Title>Welcome to Upwork!</Title>
        <TitleP>Tell us about your business and you'll be on your way to connect with talent.</TitleP>
        <TitleP>How many people are in your company?</TitleP>
         <InputWrapper>
         <Row>
        <CheckBoxInputCheck type="radio" id="option1" name="option" value="option1"/>
        <label htmlFor="option1">Just me</label><br/>
         </Row>
         <Row>
        <CheckBoxInputCheck type="radio" id="option2" name="option" value="option2"/>
        <label htmlFor="option2">1-5</label><br/>
        </Row>
         <Row>
        <CheckBoxInputCheck type="radio" id="option3" name="option" value="option3"/>
        <label htmlFor="option3">6-10</label><br/>
        </Row>
         <Row>
        <CheckBoxInputCheck type="radio" id="option4" name="option" value="option4"/>
        <label htmlFor="option4">11-50</label><br/>
        </Row>
         <Row>
        <CheckBoxInputCheck type="radio" id="option5" name="option" value="option5"/>
        <label htmlFor="option5">50+</label><br/>
        </Row>
         </InputWrapper>
            <TextInputWrapper>
                <TextInputRow>
                 <p>ggggg</p>
                <TextInput type="text" placeholder="First name"/>
                </TextInputRow>
                <TextInputRow>
                    <p>ggggg</p>
                <TextInput type="text" placeholder="First name"/>
                </TextInputRow>
                <TextInputRow>
                    <p>ggggg</p>
                <TextInput type="text" placeholder="First name"/>
                </TextInputRow>
            </TextInputWrapper>
       </TextContainer>
         <ButtonWrapper>
       <Button>Next</Button>
         </ButtonWrapper>
     </Container>
   )
 }
 
 export default WelcomeSignUp   