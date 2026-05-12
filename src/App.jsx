import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/AuthComponents/loginComponent'
import RegisterPage from './components/AuthComponents/signupComponent'
function App() {
  
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />
    </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
