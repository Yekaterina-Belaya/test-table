import { RouterProvider } from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './providers/AuthProvider'
import { router } from './routes/AppRouter'
import { Toaster } from 'sonner'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="bottom-left" richColors />
    </AuthProvider>

  )
}

export default App
