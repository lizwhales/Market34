import React, { useState } from "react";
import "./SignUpPage.css";
import axios from "../../api/axios";

const SignUpPage = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    // handle sign up
    const PostSignUp =  event =>{
        event.preventDefault();
        axios.post('/register', {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            password: values.password,
        })
        .then(function (response){
            if (response.status=="201" || response.status== "200") {
                location.pathname='/login-page';
            }
            else {
                console.log("oops");
            }
        })
        .catch(() => {
            alert('Oops, something went wrong.');
        });
    }

    return (
        <div className="form">
            <form onSubmit={PostSignUp} className="signpage" >
                <label className="sign">
                    Sign Up
                </label>
                <label className="slogan">
                and start scrolling through the marketplace!
                </label>
                <div className="mb-3">
                    <label> First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        onChange={(e)=> setValues({...values, firstName:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label> Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={(e)=> setValues({...values, lastName:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label> Email Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e)=> setValues({...values, email:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label> Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        onChange={(e)=> setValues({...values, password:e.target.value})}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already Registered <a href="/login-page"> sign in?</a>
                </p>
            </form>
        </div>
    );
}

export default SignUpPage;