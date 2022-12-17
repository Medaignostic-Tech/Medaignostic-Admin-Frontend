import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/AdminDashboard";
import AddForms from "./components/AddForms";
import ViewForms from "./components/ViewForms";
import UpdateForms from "./components/UpdateForms";
import AddValidations from "./components/AddValidations";
import ViewValidations from "./components/ViewValidations";
import auth from "./utils/auth";
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
                    <Route path = "/admin_dashboard" exact element={auth.isAuthenticated() ? <AdminDashboard /> : <Navigate to="/login" />}></Route>
                    <Route path = "/add_forms" exact element={auth.isAuthenticated() ? <AddForms /> : <Navigate to="/login" />}></Route>
                    <Route path = "/view_forms" exact element={auth.isAuthenticated() ? <ViewForms /> : <Navigate to="/login" />}></Route>
                    <Route path = "/update_forms" exact element={auth.isAuthenticated() ? <UpdateForms /> : <Navigate to="/login" />}></Route>
                    <Route path = "/add_validations" exact element={auth.isAuthenticated() ? <AddValidations /> : <Navigate to="/login" />}></Route>
                    <Route path = "/view_validations" exact element={auth.isAuthenticated() ? <ViewValidations /> : <Navigate to="/login" />}></Route>
                </Routes> 
            </BrowserRouter>
        </div>
  );
}

export default App;
