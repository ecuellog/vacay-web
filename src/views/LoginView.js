import React from 'react';
import { authenticateUser } from '../store/actions/auth';
import { connect } from 'react-redux';

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
      <div>
        <h1>LoginView</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" value={email} onChange={this.handleChange}></input>
          <input type="password" name="password" value={password} onChange={this.handleChange}></input>
          <button type="submit">Login</button>
        </form>

        { this.props.requestError !== '' &&
          <div>
            {this.props.requestError}
          </div>
        }

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