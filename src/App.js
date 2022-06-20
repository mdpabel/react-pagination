import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import './App.css';
import Photos from './views/photos/Photos';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Photos />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
