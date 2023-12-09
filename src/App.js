import './App.css';
import { Routes, Route } from 'react-router-dom';
import Sector from './Sector/sector';
import SignUp from './SignUp/signup';
import LogIn from './LogIn/login';
import Edit from './Edit/edit';
function App() {
  return (
    <div className="App">
      
        <div>
          <Routes>
            
            <Route path="/sector" element={<Sector />} />
             <Route path="/signup" element={<SignUp />} />
             <Route path="/" element={<LogIn />} />
             <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>

    </div>
  );
}

export default App;
