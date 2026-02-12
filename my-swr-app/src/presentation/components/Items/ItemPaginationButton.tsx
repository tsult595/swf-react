import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 50px;

  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.div<{ $active?: boolean }>`
    padding: 10px 20px;
    background: ${props => props.$active ? '#764ba2' : '#667eea'};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: ${props => props.$active ? 'bold' : 'normal'};

    &:hover {
      background: #764ba2;
    }
`;

const ItemPaginationButton = ({ currentPage, onPageChange, totalPages }: { currentPage: number, onPageChange: (page: number) => void, totalPages: number }) => {
  return (
    <Container>
      <Button onClick={() => onPageChange(currentPage - 1)}
        style={{ visibility: currentPage > 1 ? 'visible' : 'hidden' }}>
        ←
      </Button>
      {
      Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <Button
          key={page}
          $active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))
      }
      <Button onClick={() => onPageChange(currentPage + 1)}
        style={{ visibility: currentPage < totalPages ? 'visible' : 'hidden' }}>
        →
      </Button>
    </Container>
  )
}

export default ItemPaginationButton