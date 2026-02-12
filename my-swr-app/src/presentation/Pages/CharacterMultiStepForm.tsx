import styled from 'styled-components';
import { useState } from 'react';

const Body = styled.div`
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #e3e2e2;
  min-height: 100vh;
`;

const FormWrapper = styled.div`
  width: 70%;
  padding: 20px;
  margin: 0 auto;
  min-height: 100vh;
  color: white;
  flex-direction: column;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: auto;
  margin: 0 auto;
  gap: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid #b8b8b8;
`;

const FormHeader = styled.div`
  margin: 0;
  color: #333;
  display: flex;
`;

const FormHeaderTitle = styled.h2`
  margin: 0;
  color: #333;  
  text-align: center;
  flex: 1;
`;

const FormHeaderButton = styled.button`
  margin-left: auto;
  border: none;
  background: #ffffff;
  width: 80px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
`;

const ThreeOptionsWrapper = styled.div`
  display: flex;
    gap: 20px;
`;

const OptionsCardTitle = styled.h3`
  margin: 0;
  color: #333;
  text-align: center;
  line-height: 100px;
    `;

const OptionCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  height: 150px;
  flex: 1;
  border-radius: 10px;
  border: 1px solid #b8b8b8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4a90d9;
    box-shadow: 0 0 0 1px #4a90d9;
  }
`;

const SearchCharacterInput = styled.input`
  width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #b8b8b8;
    background: #f5f5f5;
`;

const SectionTitle = styled.h4`
  margin: 0;
  color: #4a90d9;
  font-size: 14px;
  font-weight: 500;
`;

const CharactersMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  gap: 20px;
  padding-bottom: 50px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const CharactersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CharacterMenuCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  height: 45px;
  width: calc(33.33% - 8px);
  border-radius: 8px;
  cursor: pointer;
  color: #333;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CardName = styled.span`
  color: #333;
  font-size: 14px;
`;

const SubmitButton = styled.button`
    margin-top: 20px;
    padding: 12px 20px;
    background: #4a90d9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    align-self: flex-end;
    `;

const popularCharacters = ['Warrior', 'Mage', 'Archer', 'Paladin', 'Rogue', 'Healer'];
const allCharacters = ['Berserker', 'Necromancer', 'Assassin', 'Druid', 'Sorcerer', 'Knight', 'Monk', 'Ranger', 'Warlock'];
const levels = ['10', '20', '30', '40', '50', '60', '70'];
const bids = ['10', '20', '30', '40', '50', '60', '70'];

type Step = 'rarity' | 'name' | 'level' | 'price' | 'bid' | 'done';

const CharacterMultiStepForm = () => {
  const [form, setForm] = useState({
    rarity: '',
    name: '',
    level: '',
    price: '',
    bid: ''
  });

  const [currentStep, setCurrentStep] = useState<Step>('rarity');
  const [searchName, setSearchName] = useState('');
  const [searchLevel, setSearchLevel] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchBid, setSearchBid] = useState('');

  const selectRarity = (rarity: string) => {
    setForm(prev => ({ ...prev, rarity }));
    setCurrentStep('name');
  };

  const selectName = (name: string) => {
    setForm(prev => ({ ...prev, name }));
    setCurrentStep('level');
  };

  const selectLevel = (level: string) => {
    setForm(prev => ({ ...prev, level }));
    setCurrentStep('price');
  };

  const selectPrice = (price: string) => {
    setForm(prev => ({ ...prev, price }));
    setCurrentStep('bid');
  };

  const selectBid = (bid: string) => {
    setForm(prev => ({ ...prev, bid }));
    setCurrentStep('done');
  };

  const handleReset = () => {
    setForm({ rarity: '', name: '', level: '', price: '', bid: '' });
    setCurrentStep('rarity');
    setSearchName('');
    setSearchLevel('');
    setSearchPrice('');
    setSearchBid('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  // Клик на заполненный input — вернуться к этому шагу
  const goBackToStep = (step: Step) => {
    setCurrentStep(step);
  };

  const filteredPopular = popularCharacters.filter(c =>
    c.toLowerCase().includes(searchName.toLowerCase())
  );
  const filteredAll = allCharacters.filter(c =>
    c.toLowerCase().includes(searchName.toLowerCase())
  );
  const filteredLevels = levels.filter(l => l.includes(searchLevel));

  const filteredBids = bids.filter(b => b.includes(searchBid));

  return (
    <Body>
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <FormHeader>
            <FormHeaderTitle>Create Your Character</FormHeaderTitle>
            <FormHeaderButton type="button" onClick={handleReset}>Reset</FormHeaderButton>
        </FormHeader>

            {/* Rarity — всегда видно */}
            <ThreeOptionsWrapper>
                <OptionCard onClick={() => selectRarity('Common')}
                  style={form.rarity === 'Common' ? { borderColor: '#4a90d9', boxShadow: '0 0 0 1px #4a90d9' } : {}}>
                    <OptionsCardTitle>Common</OptionsCardTitle>
                </OptionCard>
                <OptionCard onClick={() => selectRarity('Middle')}
                  style={form.rarity === 'Middle' ? { borderColor: '#4a90d9', boxShadow: '0 0 0 1px #4a90d9' } : {}}>
                    <OptionsCardTitle>Middle</OptionsCardTitle>
                </OptionCard>
                <OptionCard onClick={() => selectRarity('High')}
                  style={form.rarity === 'High' ? { borderColor: '#4a90d9', boxShadow: '0 0 0 1px #4a90d9' } : {}}>
                    <OptionsCardTitle>High</OptionsCardTitle>
                </OptionCard>
            </ThreeOptionsWrapper>

            {/* Name input — появляется после выбора rarity */}
            {form.rarity && (
              <>
                <SearchCharacterInput
                  placeholder="Search for character name..."
                  value={form.name || searchName}
                  onClick={() => form.name ? goBackToStep('name') : null}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    setForm(prev => ({ ...prev, name: '' }));
                    setCurrentStep('name');
                  }}
                  // readOnly={!!form.name && currentStep !== 'name'}
                  readOnly={form.name ? currentStep !== 'name' : false}
                  style={form.name ? { borderColor: '#4a90d9', background: '#f0f7ff' } : {}}
                />

                {currentStep === 'name' && (
                  <CharactersMenuWrapper>
                    <SectionTitle>Popular</SectionTitle>
                    <CharactersGrid>
                      {filteredPopular.map(name => (
                        <CharacterMenuCard key={name} onClick={(e) => { e.stopPropagation(); selectName(name); }}>
                          <CardName>{name}</CardName>
                        </CharacterMenuCard>
                      ))}
                    </CharactersGrid>
                    <SectionTitle>All Characters</SectionTitle>
                    <CharactersGrid>
                      {filteredAll.map(name => (
                        <CharacterMenuCard key={name} onClick={(e) => { e.stopPropagation(); selectName(name); }}>
                          <CardName>{name}</CardName>
                        </CharacterMenuCard>
                      ))}
                    </CharactersGrid>
                  </CharactersMenuWrapper>
                )}
              </>
            )}

            {/* Level input — появляется после выбора name */}
            {form.name && (
              <>
                <SearchCharacterInput
                  placeholder="Search for character level..."
                  value={form.level || searchLevel}
                  onClick={() => form.level ? goBackToStep('level') : null}
                  // onClick={() => { if (form.name) goBackToStep('name'); }}
                  // onClick={() => form.name && goBackToStep('name')}
                  // onClick={() => { if (form.name) goBackToStep('name'); }}
                  onChange={(e) => {
                    setSearchLevel(e.target.value);
                    setForm(prev => ({ ...prev, level: '' }));
                    setCurrentStep('level');
                  }}
                  readOnly={form.level ? currentStep !== 'level' : false}
                  // readOnly={!!form.level && currentStep !== 'level'}
                
                  style={form.level ? { borderColor: '#4a90d9', background: '#f0f7ff' } : {}}
                />

                {currentStep === 'level' && (
                  <CharactersGrid>
                    {filteredLevels.map(level => (
                      <CharacterMenuCard key={level} onClick={(e) => { e.stopPropagation(); selectLevel(level); }}>
                        <CardName>{level}</CardName>
                      </CharacterMenuCard>
                    ))}
                  </CharactersGrid>
                )}
              </>
            )}

            {/* Price input — появляется после выбора level */}
            {form.level && (
              <>
                <SearchCharacterInput
                  id="character-price"
                  name="character-price"
                  placeholder="Enter price and press Enter..."
                  value={form.price || searchPrice}
                  onClick={() => form.price ? goBackToStep('price') : null}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '' || /^\d+$/.test(val)) {
                      setSearchPrice(val);
                      setForm(prev => ({ ...prev, price: '' }));
                      setCurrentStep('price');
                    } else {
                      alert('Please enter numbers only!');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchPrice.trim()) {
                      e.preventDefault();
                      selectPrice(searchPrice.trim());
                    }
                  }}
                  readOnly={form.price ? currentStep !== 'price' : false}
                  style={form.price ? { borderColor: '#4a90d9', background: '#f0f7ff' } : {}}
                />
              </>
            )}

           
            {form.price && (
              <>
                <SearchCharacterInput
                  placeholder="Search for character bid..."
                  value={form.bid || searchBid}
                  onClick={() => form.bid ? goBackToStep('bid') : null}
                  onChange={(e) => {
                    setSearchBid(e.target.value);
                    setForm(prev => ({ ...prev, bid: '' }));
                    setCurrentStep('bid');
                  }}
                  readOnly={form.bid ? currentStep !== 'bid' : false}
                  style={form.bid ? { borderColor: '#4a90d9', background: '#f0f7ff' } : {}}
                />

                {currentStep === 'bid' && (
                  <CharactersGrid>
                    {filteredBids.map(bid => (
                      <CharacterMenuCard key={bid} onClick={(e) => { e.stopPropagation(); selectBid(bid); }}>
                        <CardName>{bid}</CardName>
                      </CharacterMenuCard>
                    ))}
                  </CharactersGrid>
                )}
              </>
            )}

            {/* Submit — появляется когда всё заполнено */}
            {currentStep === 'done' && (
              <SubmitButton type="submit">Submit</SubmitButton>
            )}
      </Form>
    </FormWrapper>
    </Body>
  )
}

export default CharacterMultiStepForm