import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 50px;
  background: #b9a83d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.div`
    padding: 10px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;



const MysteryBoxPaginationButtons = () => {
  return (
    <Container>
      <Button>1</Button>
      <Button>2</Button>
    </Container>
  )
}

export default MysteryBoxPaginationButtons