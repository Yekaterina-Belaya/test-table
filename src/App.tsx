import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './providers/AuthProvider';
import { router } from './routes/AppRouter';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="bottom-left" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
