import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar/NavBar';

function ViewWrapperAuthenticated({ children, isAuthenticated, ...rest }) {
  function renderRedirect(location) {
    sessionStorage.setItem('authRouteRedirect', location.pathname);
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location }
        }}
      />
    );
  }

  return (
    <div>
      <NavBar />
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? children : <>{renderRedirect(location)}</>
        }
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(ViewWrapperAuthenticated);
