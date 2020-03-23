import React from 'react';
import { deauthenticateUser } from '../../store/actions/auth';
import { connect } from 'react-redux';

function ActionClickLogout(props) {
  function handleClick(e) {
    e.preventDefault();
    props.deauthenticateUser();
  }

  return (
    <a href="#" className={props.className} onClick={handleClick}>
      Logout
    </a>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deauthenticateUser: () => dispatch(deauthenticateUser())
  }
}

export default connect(null, mapDispatchToProps)(ActionClickLogout);