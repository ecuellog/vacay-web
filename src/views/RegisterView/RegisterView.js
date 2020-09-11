import React, { useState } from 'react';
import { registerUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logov2_200x200.png';
import '../LoginView/LoginView.scss';

function RegisterView(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.registerUser(name, email, password);
  }

  return (
    <div className="component-login-view">
      <div className="container-fluid d-flex flex-column justify-content-center">
        <div className="login-container row px-3 py-5 px-md-5">
          <div className="col-sm-8 offset-sm-2">
            <img className="mb-5" src={Logo}></img>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                </input>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                </input>
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                </input>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
            <h6 className="py-3">or</h6>
            <button className="btn btn-facebook btn-block mb-3">Register with Facebook</button>
            <button className="btn btn-google btn-block">Register with Google</button>
            { props.requestError !== '' &&
              <div>
                {props.requestError}
              </div>
            }
            <div className="mt-4">
              <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (name, email, password) => dispatch(registerUser(name, email, password))
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    requestError: state.auth.requestError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);