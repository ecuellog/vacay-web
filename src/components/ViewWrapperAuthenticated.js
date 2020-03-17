import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

function ViewWrapperAuthenticated({ children, isAuthenticated, ...rest}) {
  return (
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
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(ViewWrapperAuthenticated);