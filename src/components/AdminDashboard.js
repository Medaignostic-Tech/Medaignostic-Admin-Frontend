import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import AdminNavbar from './AdminNavbar';


function AdminDashboard() {
    const loginNavigate = useNavigate();

    const [user, setUser] = useState({
        "id": "",
        "email": "",
        "is_active": true,
        "is_superuser": false,
        "is_verified": false,
        "name": ""
    });

    useEffect(() => {
        const fetchData = async () => {
            if (auth.isAuthenticated() && await auth.isSuperUser()) {
                const result = await auth.getUser();
                if (result === "Invalid or Inactive User" || result === "Internal Server Error") {
                    loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": result}});
                    loginNavigate(0);
                }
                else {
                    setUser(result);
                }
            }
            else {
                loginNavigate("/login", {replace:true, state:{"alert_status": "failure", "alert": "You do not have access to this page"}});
                loginNavigate(0);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="common-background">
            <AdminNavbar />
            <p>Hello { user.name }</p>
        </div>
    );
}

export default AdminDashboard;