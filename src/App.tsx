import { RouterProvider } from 'react-router-dom'
import './App.scss'
import { AuthProvider } from './providers/AuthProvider'
import { router } from './routes/AppRouter'
import { HomePage } from './pages/home/HomePage'

function App() {
  return (
    // <AuthProvider>
    //   <RouterProvider router={router}></RouterProvider>
    // </AuthProvider>
    <HomePage></HomePage>
  )
}

export default App
