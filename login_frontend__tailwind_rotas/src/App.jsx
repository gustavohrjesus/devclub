import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Cadastro from './pages/Cadastro'
import ListarUsuarios from "./pages/Lista"
import Login from './pages/Login'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Cadastro /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/listar-usuarios" element={ <ListarUsuarios /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
