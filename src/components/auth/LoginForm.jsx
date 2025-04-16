import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginForm() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Joi schema
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.empty': t('Email is required'),
            'string.email': t('Invalid email'),
        }),
        password: Joi.string().min(8).required().messages({
            'string.empty': t('Password is required'),
            'string.min': t('Password must be at least 8 characters'),
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
        const user = existingUsers.find((user) => user.email === formData.email);

        if (!user) {
            toast.error(t('User not found'), {
                position: "top-center"
            });
            return;
        }

        if (user.password !== formData.password) {
            toast.error(t('Incorrect password Or email'), {
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

        localStorage.setItem('currentUser', JSON.stringify(user));
        setSuccess(t('Login successful!'));
        toast.success(t('Login successful!'), {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


        if (user?.role === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="card p-4 shadow" style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
                <h4 className="text-center mb-3">{t('Login')}</h4>

                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit} noValidate>
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

                    <button type="submit" className="btn btn-primary w-100">{t('Submit')}</button>
                </form>

                <div className="mt-3 text-center">
                    <span>{t("Don't have an account?")} -- </span>
                    <Link to="/register">{t('Register')}</Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
