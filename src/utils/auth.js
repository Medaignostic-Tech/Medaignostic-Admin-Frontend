import decodeJwt from 'jwt-decode';
import axios from 'axios';

class Auth {
    url = "http://localhost:8000";

    login = async(email, password) => {
        let response = [];
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        await axios.post(`${this.url}/auth/jwt/login`, formData)
            .then(res => {
                const data = res.data;
                if ('access_token' in data) {
                    const decodedToken = decodeJwt(data['access_token']);
                    console.log(decodedToken);
                    localStorage.setItem('token', data['access_token']);
                    localStorage.setItem('permissions', 'user');
                    response = ["Login Success", "text-success"];
                } else {
                    response = ["API Error", "text-danger"];
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 500) {
                        response = ["Internal Server Error", "text-danger"];
                    } else {
                        const data = err.response.data;
                        if (err.response.status >= 400 && err.response.status < 500) {
                            if (data.detail) {
                                if (data.detail === "LOGIN_BAD_CREDENTIALS") {
                                    response = ["Invalid Login Credentials", "text-danger"];
                                } else if (data.detail === "LOGIN_USER_NOT_VERIFIED") {
                                    response = ["User is not verified", "text-danger"];
                                } else {
                                    response = ["Internal Server Error", "text-danger"];
                                }
                            } else {
                                response = ["Internal Server Error", "text-danger"];
                            }
                        } else {
                            response = ["Internal Server Error", "text-danger"];
                        }
                    }
                }

            });
        return response;
    }

    forgotPassword = async(email) => {
        let response = [];
        const formData = {
            "email": email
        }
        await axios.post(`${this.url}/auth/forgot-password`, formData)
            .then(res => {
                const data = res.data;
                console.log(data);
                if (data === null) {
                    response = ["Secret code sent successfully to your registered mail", "success"];
                } else {
                    response = ["API Error", "failure"];
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    const data = err.response.data;
                    if (data.detail === "User does not exist") {
                        response = ["User does not exist", "failure"];
                    } else {
                        response = ["Internal Server Error", "failure"];
                    }
                } else if (err.response.status === 422) {
                    response = ["Validation Error", "failure"];
                } else {
                    response = ["Internal Server Error", "failure"];
                }
            });
        return response;
    }

    resetPassword = async(secretCode, newPassword) => {
        let response = [];
        const formData = {
            "token": secretCode,
            "password": newPassword
        };
        await axios.post(`${this.url}/auth/reset-password`, formData)
            .then(res => {
                const data = res.data;
                if (data === null) {
                    response = ["Password changed successfully", "success"];
                } else {
                    response = ["API Error", "failure"];
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    const data = err.response.data;
                    if (data.detail === "RESET_PASSWORD_BAD_TOKEN") {
                        response = ["Invalid Secret Code", "failure"];
                    } else {
                        response = ["Password Validation Failed", "failure"];
                    }
                } else {
                    response = ["Internal Server Error", "failure"];
                }
            });
        return response;
    }

    isAuthenticated = () => {
        const permissions = localStorage.getItem('permissions');
        if (!permissions) {
            return false;
        }
        return permissions === 'user' ? true : false;
    }

    logout = (callback) => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        callback();
    }

    getUser = async() => {
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.get(`${this.url}/users/me`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    isSuperUser = async() => {
        const user = await this.getUser();
        if (user === "Invalid or Inactive User" || user === "Internal Server Error") {
            return false;
        }
        return user.is_superuser;
    }

    getForms = async(organ) => {
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "organ": organ
            }
        };
        await axios.get(`${this.url}/forms/`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    addForms = async(organ, type, label, name, option) => {
        const token = localStorage.getItem("token");
        let response = [];
        const formData = {
            "type": type,
            "label": label,
            "name": name,
            "option": option,
            "organ": organ
        };
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.post(`${this.url}/forms`, formData, verificationData)
            .then(res => {
                response = ["Form Field Added Successfully", "text-success"];
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = ["Validation Error", "text-danger"];
                } else if (err.response.status === 401) {
                    response = ["Invalid or Inactive User", "text-danger"];
                } else {
                    response = ["Internal Server Error", "text-danger"];
                }
            });
        return response;
    }

    getFormsByPage = async(page) => {
        const per_page = 10;
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "page": page,
                "per_page": per_page
            }
        };
        await axios.get(`${this.url}/forms/all`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    deleteForm = async(id) => {
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "formId": id
            }
        };
        await axios.delete(`${this.url}/forms`, verificationData)
            .then(res => {
                response = "Field Deleted Successfully";
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = "Validation Error";
                } else {
                    response = "Internal Server Error";
                }
            })
        return response;
    }

    updateForm = async(id, organ, type, label, name, option) => {
        const token = localStorage.getItem("token");
        let response = [];
        const formData = {
            "type": type,
            "label": label,
            "name": name,
            "option": option,
            "organ": organ
        };
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                "formId": id
            }
        };
        await axios.patch(`${this.url}/forms`, formData, verificationData)
            .then(res => {
                response = ["Form Field Updated Successfully", "text-success"];
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = ["Validation Error", "text-danger"];
                } else if (err.response.status === 401) {
                    response = ["Invalid or Inactive User", "text-danger"];
                } else {
                    response = ["Internal Server Error", "text-danger"];
                }
            });
        return response;
    }

    addValidations = async(val_name, val_link, data_link, field_names) => {
        const token = localStorage.getItem("token");
        let response = [];
        const formData = {
            "validation_name": val_name,
            "validation_link": val_link,
            "data_link": data_link,
            "field_names": field_names
        };
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.post(`${this.url}/validations`, formData, verificationData)
            .then(res => {
                response = ["Validation Field Added Successfully", "text-success"];
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = ["Validation Error", "text-danger"];
                } else if (err.response.status === 401) {
                    response = ["Invalid or Inactive User", "text-danger"];
                } else {
                    response = ["Internal Server Error", "text-danger"];
                }
            });
        return response;
    }

    getValidationsByPage = async(page) => {
        const per_page = 10;
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "page": page,
                "per_page": per_page
            }
        };
        await axios.get(`${this.url}/validations/all`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    deleteValidation = async(id) => {
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "validationId": id
            }
        };
        await axios.delete(`${this.url}/validations`, verificationData)
            .then(res => {
                response = "Validation Field Deleted Successfully";
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = "Validation Error";
                } else {
                    response = "Internal Server Error";
                }
            })
        return response;
    }

    updateValidation = async(id, validation_name, validation_link, data_link, field_names) => {
        const token = localStorage.getItem("token");
        let response = [];
        const formData = {
            "validation_name": validation_name,
            "validation_link": validation_link,
            "data_link": data_link,
            "field_names": field_names
        };
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                "validationId": id
            }
        };
        await axios.patch(`${this.url}/validations`, formData, verificationData)
            .then(res => {
                response = ["Validation Field Updated Successfully", "text-success"];
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = ["Validation Error", "text-danger"];
                } else if (err.response.status === 401) {
                    response = ["Invalid or Inactive User", "text-danger"];
                } else {
                    response = ["Internal Server Error", "text-danger"];
                }
            });
        return response;
    }

    getDoctors = async() => {
        const token = localStorage.getItem("token");
        let response = [];
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.get(`${this.url}/verification/doctors`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    getValidations = async() => {
        const token = localStorage.getItem("token");
        let response = [];
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.get(`${this.url}/verification/validations`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    addVerifier = async(user_id, validation_id) => {
        const token = localStorage.getItem("token");
        let response = [];
        const formData = {
            "user_id": user_id,
            "validation_id": validation_id
        };
        const verificationData = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        await axios.post(`${this.url}/verification`, formData, verificationData)
            .then(res => {
                if (res.data["result"] === "Record already exists") {
                    response = ["Verifier Exists", "text-success"];
                } else {
                    response = ["Verifier Added Successfully", "text-success"];
                }
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = ["Validation Error", "text-danger"];
                } else if (err.response.status === 401) {
                    response = ["Invalid or Inactive User", "text-danger"];
                } else {
                    response = ["Internal Server Error", "text-danger"];
                }
            });
        return response;
    }

    getVerifiersByPage = async(page) => {
        const per_page = 10;
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "page": page,
                "per_page": per_page
            }
        };
        await axios.get(`${this.url}/verification/all`, verificationData)
            .then(res => {
                const data = res.data;
                response = data;
            })
            .catch(err => {
                if (err.response.status === 401) {
                    response = "Invalid or Inactive User";
                } else {
                    response = "Internal Server Error";
                }
            });
        return response;
    }

    deleteVerifier = async(id) => {
        const token = localStorage.getItem("token");
        let response;
        const verificationData = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                "verifier_id": id
            }
        };
        await axios.delete(`${this.url}/verification`, verificationData)
            .then(res => {
                response = "Verification Deleted Successfully";
            })
            .catch(err => {
                if (err.response.status === 422) {
                    response = "Validation Error";
                } else {
                    response = "Internal Server Error";
                }
            })
        return response;
    }
}

export default new Auth();