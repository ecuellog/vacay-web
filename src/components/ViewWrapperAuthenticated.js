import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import NavBar from './NavBar/NavBar';

function ViewWrapperAuthenticated({ children, isAuthenticated, ...rest}) {
  return (
    <div>
      <NavBar/>
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(ViewWrapperAuthenticated);