import logo from './logo.svg'
import './sass/main.css'
import './App.css'
import MenuPage from './components/MenuPage'
import 'font-awesome/css/font-awesome.min.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutShow from './components/AboutShow'
import Navbar from './components/Navbar'

function App() {
  const [data, setData] = useState(null)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<MenuPage data={data} setData={setData} />} />
        <Route path='/show/:id' element={<AboutShow data={data} />} />
      </Routes>
    </>
  )
}

export default App
