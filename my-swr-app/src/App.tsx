import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { SWRConfig } from 'swr';
import HomePage from './presentation/Pages/HomePage'; 
import MainComponentChat from './presentation/components/Chat/MainComponentChat';
import MainWelcomePage from './presentation/Pages/MainWelcomePage';
import { useAnonymousUser } from './presentation/hooks/useAnonymousUser';
import CharacterMultiStepForm from './presentation/Pages/CharacterMultiStepForm';
import JoinAsWhoSighUp from './presentation/Pages/JoinAsWhoSighUp';
import SignUp from './presentation/Pages/SignUp';
import WelcomeSignUp from './presentation/Pages/WelcomeSignUp';


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
`;

const localStorageProvider = () => {
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  return map;
};

function App() {
   useAnonymousUser();
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ 
        provider: localStorageProvider,
        revalidateOnFocus: false,
        dedupingInterval: 2000
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/chat" element={<MainComponentChat />} />
            <Route path="/welcome" element={<MainWelcomePage />} />
            <Route path="/char-form" element={<CharacterMultiStepForm />} />
            <Route path="/join-as" element={<JoinAsWhoSighUp />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/welcome-sign" element={<WelcomeSignUp />} />
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </>
  );
}

export default App;