import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/login/Login'
import { Home } from './pages/home/Home'
import { CharacterCreation } from './pages/characterCreation/CharacterCreation'
import { TreasonOnTheCastle} from './pages/treasonOnTheCastle/TreasonOnTheCastle.tsx'
import { Payments } from './pages/payments/Payments'
import { Header } from './assets/common/header/Header.tsx'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/character-creation' element={<CharacterCreation/>}/>
            <Route path='/payment' element={<Payments/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/treason-on-the-castle' element={<TreasonOnTheCastle/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
