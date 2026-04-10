import React, { useState } from 'react';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { saveToLocalStorage } from '../../utils/authUtils';
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = {
            id: Date.now(),
            fullName: formData.fullName,
            email: formData.email,
            userType: formData.userType,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        saveToLocalStorage('users', users);
        saveToLocalStorage('currentUser', { ...newUser, isLoggedIn: true });

        alert('Account created successfully! (Demo)');
        // navigate to login or dashboard
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="logo">🧳 OpportuniCam</div>
                    <h1>Create Account</h1>
                    <p>Join thousands finding opportunities</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />

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
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <Select
                        label="I am a"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        options={[
                            { value: "Job Seeker", label: "Job Seeker" },
                            { value: "Employer", label: "Employer" }
                        ]}
                    />

                    <Button type="submit" className="btn btn-primary full-width">
                        Create Account
                    </Button>
                </form>

                <p className="switch-auth">
                    Already have an account? <a href="/login">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;