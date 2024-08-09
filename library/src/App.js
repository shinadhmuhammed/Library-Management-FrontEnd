import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminRouter from "./Routes/AdminRouter";
import UserRouter from "./Routes/UserRouter";


function App() {
  return (
   <div>
     <Router>
        <Routes>
        <Route path='/*' element={< UserRouter/>} />
          <Route path='/admin/*' element={<AdminRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
