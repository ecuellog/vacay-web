import React from 'react';
import { authenticateUser } from '../../store/actions/auth';
import { connect } from 'react-redux';
import Logo from '../../assets/images/logov2_200x200.png';
import './LoginView.scss';

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticateUser(this.state.email, this.state.password);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.isAuthenticated) {
      this.props.history.push("/tabs");
    }
  }

  render() {
    const {email, password} = this.state;
    return (
      <div className="component-login-view">
        <div className="container-fluid d-flex flex-column justify-content-center">
          <div className="login-container row px-3 py-5 px-md-5">
            <div className="col-sm-8 offset-sm-2">
              <img className="mb-5" src={Logo}></img>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  >
                  </input>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
              <h6 className="py-3">or</h6>
              <button className="btn btn-facebook btn-block mb-3">Sign in using Facebook</button>
              <button className="btn btn-google btn-block">Sign in using Google</button>
              { this.props.requestError !== '' &&
                <div>
                  {this.props.requestError}
                </div>
              }
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
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