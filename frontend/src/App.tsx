import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import ChatPage from './pages/Chat';
import axios from 'axios';

import { store } from '../store'
import { Provider, useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}>
          </Route>

          <Route path='/register' element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path='/chat' element={<ChatPage></ChatPage>}></Route>
        </Routes>
      </BrowserRouter>
      {/* </Provider> */}
    </>
  )
}

export default App
