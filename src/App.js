import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import './App.css';

function App() {
  return (
    <div className="App common-background">
      <BrowserRouter>
            <Routes>
                <Route path = "/" exact element={<Home />}></Route> 
                <Route path = "/login" exact element={<Login /> }></Route>
                <Route path = "/forgot_password" exact element={<ForgotPassword />}></Route>
                <Route path = "/reset_password" exact element={<ResetPassword />}></Route>
            </Routes> 
        </BrowserRouter>
    </div>
  );
}

export default App;
