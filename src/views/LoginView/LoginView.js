import React, { useState } from 'react';
import { authenticateUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import Logo from '../../assets/images/logov2_200x200.png';
import './LoginView.scss';

function LoginView(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  function handleSubmit(e) {
    e.preventDefault();
    props.authenticateUser(email, password);
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
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
            <h6 className="py-3">or</h6>
            <button className="btn btn-facebook btn-block mb-3">Sign in using Facebook</button>
            <button className="btn btn-google btn-block">Sign in using Google</button>
            { props.requestError !== '' &&
              <div>
                {props.requestError}
              </div>
            }
          </div>
        </div>
      </div>

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    requestError: state.auth.requestError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);