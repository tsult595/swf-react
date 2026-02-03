import styled from 'styled-components';
import { UserPresenter, FavoritePresenter } from '../..';
import { useState } from 'react';
import UserFavoritesCard from './UserFavoritesCard';

const MainContainer = styled.div`
  width: 100%;
  height: 90vh;
`;

const MainAllUsersWrapper = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e;
  color: white;
`;

const UsersWrapper = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.$selected ? '#444' : '#2a2a2a'};
  width: 100%;
  height: 50px;
  padding: 20px;
  justify-content: center;
  align-items: center;  
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
`;

const CardsWrapper = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;  
`;

    

const Title = styled.h2`
  margin: 0;
  margin-bottom: 20px;
`;




const UserFavoritesComponent = () => {
 const { data: users, isLoading, error} = UserPresenter.useFetchUsers();
 const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
 const { data: favorites, isLoading: favoritesLoading } = FavoritePresenter.useGetFavorites(selectedUserId || '');
 const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);

 return (
    <>
   
     <MainContainer>
        {isLoading && <div>Loading users...</div>}
        {error && <div>Error loading users: {error.message}</div>}
      <MainAllUsersWrapper>
        <Title>All Users</Title>
        {
        users?.map((user)=>(
        <UsersWrapper 
          key={user.id} 
          $selected={selectedUserId === user.id} 
          onClick={() => setSelectedUserId(user.id)}
        >
         <Title>{user.id}</Title>
        </UsersWrapper>
            ))
        }
        <CardsWrapper>
          {selectedUserId ? (
            favoritesLoading ? (
              <div>Loading favorites...</div>
            ) : favorites && favorites.length > 0 ? (
              favorites.map((character) => (
                <UserFavoritesCard key={character.id}
                   character={character}
                   isViewed= {selectedCardIds.includes(character.id)}
                   addCharacterIsViewed={()=> setSelectedCardIds((prev) => prev.includes(character.id) ? prev.filter(id => id !== character.id) : [...prev, character.id])}
                    />
              ))
            ) : (
              <div>No favorites for this user</div>
            )
          ) : (
            <div>Select a user to view their favorites</div>
          )}
        </CardsWrapper>
      </MainAllUsersWrapper>
    </MainContainer>
     </>
  )
}

export default UserFavoritesComponent