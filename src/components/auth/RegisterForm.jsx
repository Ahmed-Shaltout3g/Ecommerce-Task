import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RegisterForm() {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Joi schema
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.empty': t('Name is required'),
            'string.min': t('Name must be at least 3 characters'),

        }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.empty': t('Email is required'),
            'string.email': t('Invalid email'),
        }),
        role: Joi.string().valid('admin', 'customer').required().messages({
            'string.empty': t('Role is required'),
            'any.only': t('Invalid role'),
        }),
        password: Joi.string().min(8).required().messages({
            'string.empty': t('Password is required'),
            'string.min': t('Password must be at least 8 characters'),
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': t('Passwords do not match'),
            'string.empty': t('Confirm Password is required'),
        }),
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const validationErrors = {};
            error.details.forEach((err) => {
                validationErrors[err.path[0]] = err.message;
            });
            setErrors(validationErrors);
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.find((user) => user.email === formData.email);
        if (userExists) {
            toast.error(t('User already exists'), {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }

        const newUser = { ...formData };
        delete newUser.confirmPassword;

        localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        setSuccess(t('Registration successful!'));
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });

        toast.success(t('Registration successful!'), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        navigate('/login');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="card p-4 shadow" style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
                <h4 className="text-center mb-3">{t('Register')}</h4>

                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label className="form-label">{t('Name')}</label>
                        <input
                            type="text"
                            name="name"
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('Email')}</label>
                        <input
                            type="email"
                            name="email"
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t('Role')}</label>
                        <select
                            name="role"
                            className={`form-select ${errors.role && 'is-invalid'}`}
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">{t('Select a role')}</option>
                            <option value="customer">{t('Customer')}</option>
                            <option value="admin">{t('Admin')}</option>
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('Password')}</label>
                        <input
                            type="password"
                            name="password"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">{t('Confirm Password')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">{t('Submit')}</button>
                </form>

                <div className="mt-3 text-center">
                    <span>{t("I have an account")} -- </span>
                    <Link to="/login">{t('Login')}</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
