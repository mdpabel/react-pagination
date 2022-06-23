import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import ErrorFallbackComponent from './components/errorFallback/ErrorFallbackComponent';
import Photos from './views/photos/Photos';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <Photos />
      </ErrorBoundary>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
