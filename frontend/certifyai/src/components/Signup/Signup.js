import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Assuming you have a separate CSS file for signup styles
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [email, setEmail] = useState('');
  const navigate = useNavigate()

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswordMatch(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkPasswordMatch(password, event.target.value);
  };

  const checkPasswordMatch = (password, confirmPassword) => {
    setPasswordMatch(password === confirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordMatch) {
      console.log('Form submitted');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('mobile', mobile);
      formData.append('role', role);
      formData.append('address', address);
      formData.append('email', email.toLowerCase());
      formData.append('password', password);

      fetch('http://127.0.0.1:8000/users', {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'password' : password
        }),
      })
        .then((response) => {
          if (!response.ok)
              throw new Error( 'Server response was not ok');
          return response.json()
          })
          .then(data=>{
            console.log("User", data)
            fetch(`http://127.0.0.1:8000/details`, {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body:JSON.stringify({
                'user': data.id,
                'name' : name,
                'mobile' : mobile,
                'address' : address,
                'role' : role
              })
            })
            .then(response=>{
              if (!response.ok)
                throw new Error('Server response was not ok')
              return response.json()
            })
            .then(data=>console.log(data))
            alert('Sign Up successful')
            navigate('/login')
          })
            .catch((error) => {
          alert(`${error.message}`);
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>

          <div className="form-group">
            <div className="form-row">
              <div className="form-col">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-col">
                <label>Mobile</label>
                <input
                  type="text"
                  maxLength={11}
                  className="form-control"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select your role</option>
              <option value="professional">Professional</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="form-row">
              <div className="form-col">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-col">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
            </div>
          </div>

          {!passwordMatch && (
            <div className="password-mismatch">
              Passwords do not match.
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

          <p className="register text-right">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
