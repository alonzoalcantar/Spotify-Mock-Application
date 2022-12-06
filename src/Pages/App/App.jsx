import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { useState } from 'react';
import AuthPage from '../AuthPage/AuthPage'
import Home from '../../Components/Home/home'
import Profile from '../../Components/Profile/profile'
import Navbar from '../../Components/Navbar/navbar';



function App() {

  const [user, setUser]= useState(getUser());


  return (
    <div className="App">
      <header className="App-header">
        { user ?
        <>
        <Navbar
        user = {user}
        setUser = {setUser}/> 
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/> 
          <Route path='/authpage' element={<AuthPage/>}/>
        </Routes>
        </>
        : 
        <AuthPage
        setUser = {setUser}/>
}
      </header>
      <div>
      </div>

    </div>
  );
}

export default App;
