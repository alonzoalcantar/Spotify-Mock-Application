
import { useState } from 'react';
import AuthPage from '../Components/AuthPage/AuthPage'
import Home from '../Components/Home/home'


function App() {

  const [user, setUser]= useState(null)


  return (
    <div className="App">
      <header className="App-header">
       <Home/>
      </header>
      <div>
        <AuthPage/>
      </div>
    </div>
  );
}

export default App;
