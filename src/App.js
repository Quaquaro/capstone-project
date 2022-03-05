import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';
import GlobalFonts from './assets/variable/fonts.js';
import { useState } from 'react';
import Header from './components/Header.js';
import TrackGameForm from './components/TrackGameForm.js';

function App() {
  const [nameOfGame, setNameOfGame] = useState('');
  return (
    <div>
      <GlobalFonts />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <p>{nameOfGame}</p>
        <TrackGameForm onTrackGame={trackGame} />
      </ErrorBoundary>
    </div>
  );
  function trackGame(nameOfGame) {
    setNameOfGame(nameOfGame);
  }
}

export default App;
