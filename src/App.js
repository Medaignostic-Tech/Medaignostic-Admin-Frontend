import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import './App.css';

function App() {
  return (
    <div className="App common-background">
      <BrowserRouter>
            <Routes>
                <Route path = "/" exact element={<Home />}></Route> 
                <Route path = "/login" exact element={<Login /> }></Route>
            </Routes> 
        </BrowserRouter>
    </div>
  );
}

export default App;
