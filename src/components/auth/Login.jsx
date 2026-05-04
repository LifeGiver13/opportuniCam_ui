import React, { useState } from 'react';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../util/authUtils';

const Login = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: 'Job Seeker'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // For demo: save current user
        saveToLocalStorage('currentUser', {
            email: formData.email,
            userType: formData.userType,
            isLoggedIn: true
        });

        alert('Login successful! (Demo)');
        navigate('/')

    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo">🧳 OpportuniCam</div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* <Select
                        label="I am a"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        options={[
                            { value: "Job Seeker", label: "Job Seeker" },
                            { value: "Employer", label: "Employer" }
                        ]}
                    /> */}

                    <Button type="submit" className="btn btn-primary full-width">
                        Sign In
                    </Button>
                </form>

                <p className="switch-auth">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;