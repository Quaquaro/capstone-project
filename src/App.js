import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.js';

function App() {
  return (
    <div>
      <h1>Hello Players!</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <p>First Component</p>
      </ErrorBoundary>
    </div>
  );
}

export default App;
