
// import type { Item } from '../../../Domain/Entities/enums/ItemsTypes';
// import type { Hero } from '../../../Domain/Entities/HeroTypes';
// import styled from 'styled-components';
// import { ItemsPresenter } from '../..';
// import { useHeroes } from '../../hooks/useHeroes';
// import { useState } from 'react';

// const Container = styled.div`
//   width: 100%;
//   padding: 20px;
//   min-height: 100vh;
//   color: white;
// `;

// const Section = styled.div`
//   margin-bottom: 40px;
// `;

// const SectionTitle = styled.h1`
//   font-size: 2rem;
//   margin-bottom: 20px;
//   text-align: center;
//   color: #ffd700;
//   text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
// `;

// const GridWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;
//   justify-items: center;
//   margin-top: 20px;
// `;

// const ItemCard = styled.div<{ $rarity: string }>`
//   width: 100%;
//   max-width: 250px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
//   transition: all 0.3s ease;
//   border-radius: 15px;
//   cursor: pointer;
//   background: linear-gradient(145deg, rgba(39, 43, 54, 0.9) 0%, rgba(29, 33, 43, 0.9) 100%);
//   border: 3px solid ${props => {
//     switch (props.$rarity) {
//       case 'Legendary': return '#ff6b6b';
//       case 'Epic': return '#a855f7';
//       case 'Rare': return '#3b82f6';
//       default: return '#ffd700';
//     }
//   }};
//   padding: 16px;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
//   &:hover {
//     transform: translateY(-10px) scale(1.05);
//     box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
//     border-color: #ffd700;
//   }
// `;

// const HeroCard = styled.div<{ $status: string }>`
//   width: 100%;
//   max-width: 250px;
//   height: 200px;
//   display: flex;
//   flex-direction: column;
//   transition: all 0.3s ease;
//   border-radius: 15px;
//   cursor: pointer;
//   background: linear-gradient(145deg, rgba(39, 43, 54, 0.9) 0%, rgba(29, 33, 43, 0.9) 100%);
//   border: 3px solid ${props => props.$status === 'Active' ? '#10b981' : '#ef4444'};
//   padding: 16px;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
//   &:hover {
//     transform: translateY(-10px) scale(1.05);
//     box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
//   }
// `;

// const CardTitle = styled.h2`
//   font-size: 1.2rem;
//   margin: 0 0 8px 0;
//   color: #ffd700;
//   text-align: center;
// `;

// const CardDescription = styled.p`
//   font-size: 0.9rem;
//   margin: 0;
//   color: rgba(255, 255, 255, 0.8);
//   flex-grow: 1;
//   text-align: center;
// `;

// const CardPrice = styled.p`
//   font-size: 1rem;
//   margin: 8px 0 0 0;
//   color: #10b981;
//   font-weight: bold;
//   text-align: center;
// `;

// const StatusBadge = styled.span<{ $status: string }>`
//   align-self: center;
//   padding: 4px 8px;
//   border-radius: 10px;
//   font-size: 0.8rem;
//   font-weight: bold;
//   color: white;
//   background-color: ${props => props.$status === 'Active' ? '#10b981' : '#ef4444'};
// `;

// const LoadingWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100px;
//   color: #ffd700;
//   font-size: 1.2rem;
// `;

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

// const Something = ({ onSomethingClick, handleHeroClick }: { onSomethingClick: (item: Item) => void, handleHeroClick?: (hero: Hero) => void }) => {
//   const { data: items, error, isLoading, mutate } = ItemsPresenter.useGetAllItems();
//   const { data: heroes, error: heroesError, isLoading: heroesLoading, mutate: mutateHeroes } = useHeroes();
//   const [searchItems, setSearchItems] = useState<string>('');
//   const [searchHeroes, setSearchHeroes] = useState<string>('');
//   const [itemCategory, setItemCategory] = useState<string>('all');


//   // Фильтруем предметы по поисковому запросу (по имени или описанию) и категории
//   const filteredItems = items?.filter(item =>
//     (itemCategory === 'all' || item.category === itemCategory) &&
//     (item.name.toLowerCase().includes(searchItems.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchItems.toLowerCase()))
//   );

//   // Фильтруем героев по поисковому запросу (по имени)
//   const filteredHeroes = heroes?.filter(hero =>
//     hero.name.toLowerCase().includes(searchHeroes.toLowerCase())
//   );

//   return (
//     <Container>
//       <Section>
//         <SectionTitle>Items Collection</SectionTitle>
//         <select onChange={(e) => setItemCategory(e.target.value)} name="itemCategory" id="itemCategory" >
//           <option value="all">All Categories</option>
//           <option value="weapon">Weapons</option>
//           <option value="armor">Armor</option>
//           <option value="potion">Potions</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search items by name or description..."
//           value={searchItems}
//           onChange={(e) => setSearchItems(e.target.value)}
//           style={{
//             width: '100%',
//             maxWidth: '400px',
//             padding: '10px',
//             borderRadius: '5px',
//             border: '1px solid #ffd700',
//             background: 'rgba(39, 43, 54, 0.8)',
//             color: 'white',
//             fontSize: '1rem',
//             marginBottom: '20px'
//           }}
//         />
    
//         {isLoading && <LoadingWrapper>Loading items...</LoadingWrapper>}
//         {error && (
//           <ErrorWrapper>
//             <div>Error loading items</div>
//             <button onClick={() => mutate()}>Retry</button>
//           </ErrorWrapper>
//         )}
//         <GridWrapper>
//           {filteredItems && filteredItems.map((item) => (
//             <ItemCard key={item.id} $rarity={item.rarity} onClick={() => onSomethingClick(item)}>
//               <CardTitle>{item.name}</CardTitle>
//               <CardDescription>{item.description}</CardDescription>
//               <CardPrice>Rarity: {item.rarity}</CardPrice>
//               <CardPrice>Category: {item.category}</CardPrice>
//             </ItemCard>
//           ))}
//         </GridWrapper>
//       </Section>

//       <Section>
//         <SectionTitle>Heroes Collection</SectionTitle>
//         <input
//           type="text"
//           placeholder="Search heroes by name..."
//           value={searchHeroes}
//           onChange={(e) => setSearchHeroes(e.target.value)}
//           style={{
//             width: '100%',
//             maxWidth: '400px',
//             padding: '10px',
//             borderRadius: '5px',
//             border: '1px solid #ffd700',
//             background: 'rgba(39, 43, 54, 0.8)',
//             color: 'white',
//             fontSize: '1rem',
//             marginBottom: '20px'
//           }}
//         />
//         {heroesLoading && <LoadingWrapper>Loading heroes...</LoadingWrapper>}
//         {heroesError && (
//           <ErrorWrapper>
//             <div>Error loading heroes</div>
//             <button onClick={() => mutateHeroes()}>Retry</button>
//           </ErrorWrapper>
//         )}
//         <GridWrapper>
//           {filteredHeroes?.map((hero) => (
//             <HeroCard key={hero.id} $status={hero.status} onClick={() => handleHeroClick?.(hero)}>
//               <CardTitle>{hero.name}</CardTitle>
//               <CardPrice>Price: {hero.price}</CardPrice>
//               <StatusBadge $status={hero.status}>{hero.status}</StatusBadge>
//             </HeroCard>
//           ))}
//         </GridWrapper>
//       </Section>
//     </Container>
//   );
// };

// export default Something