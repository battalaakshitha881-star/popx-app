import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser, emailExists } from '../store';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  password: '',
  company: '',
  isAgency: '',
};

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit phone number';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email address';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (!form.isAgency) e.isAgency = 'Please select an option';
    if (!e.email && emailExists(form.email)) e.email = 'An account with this email already exists';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    saveUser({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password,
      company: form.company.trim(),
      isAgency: form.isAgency,
    });
    navigate('/login', { state: { justSignedUp: true } });
  }

  const isComplete =
    form.fullName && form.phone && form.email && form.password && form.isAgency;

  return (
    <div className="screen">
      <form className="auth" onSubmit={handleSubmit} noValidate>
        <h1>
          Create your
          <br />
          PopX account
        </h1>

        <div className="field">
          <label htmlFor="fullName">Full Name*</label>
          <input
            id="fullName"
            type="text"
            placeholder="Marry Doe"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
          />
          {errors.fullName && <div className="field-error">{errors.fullName}</div>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number*</label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
            maxLength={10}
          />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </div>

        <div className="field">
          <label htmlFor="email">Email address*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>

        <div className="field">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
          />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </div>

        <div className="field">
          <label htmlFor="company">Company name</label>
          <input
            id="company"
            type="text"
            placeholder="Enter company name"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </div>

        <div className="radio-group">
          <label className="field-label">Are you an Agency?*</label>
          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="isAgency"
                checked={form.isAgency === 'yes'}
                onChange={() => update('isAgency', 'yes')}
              />
              Yes
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="isAgency"
                checked={form.isAgency === 'no'}
                onChange={() => update('isAgency', 'no')}
              />
              No
            </label>
          </div>
          {errors.isAgency && <div className="field-error">{errors.isAgency}</div>}
        </div>

        <button className="btn-primary" type="submit" disabled={!isComplete}>
          Create Account
        </button>
      </form>
    </div>
  );
}
