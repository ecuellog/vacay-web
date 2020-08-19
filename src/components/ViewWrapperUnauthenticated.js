import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function ViewWrapperUnauthenticated({ children, isAuthenticated, ...rest }) {
  function handleRedirect(location) {
    let authRouteRedirect = sessionStorage.getItem('authRouteRedirect');

    let pathname = authRouteRedirect ? authRouteRedirect : '/tabs';

    return (
      <Redirect
        to={{
          pathname,
          state: { from: location }
        }}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? children : <>{handleRedirect(location)}</>
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(ViewWrapperUnauthenticated);
