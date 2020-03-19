import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { setTokenAuthenticatedUser } from './store/actions/auth';

// Components
import LoginView from './views/LoginView';
import TabsView from './views/TabsView';
import SharedTabsView from './views/SharedTabsView';
import FriendsView from './views/FriendsView';
import SettingsView from './views/SettingsView';
import './App.css';
import ViewWrapperAuthenticated from './components/ViewWrapperAuthenticated';
import ViewWrapperUnauthenticated from './components/ViewWrapperUnauthenticated';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.props.setTokenAuthenticatedUser();
  }

  render() {
    return (
      <div>
      { this.props.initialAuthDone && 
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">login</Link>
                </li>
                <li>
                  <Link to="/tabs">tabs</Link>
                </li>
                <li>
                  <Link to="/sharedtabs">sharedtabs</Link>
                </li>
                <li>
                  <Link to="/friends">friends</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
              </ul>
            </nav>
      
            <Switch>
              <Redirect exact from="/" to="/login" />
              <ViewWrapperUnauthenticated path="/login">
                <LoginView />
              </ViewWrapperUnauthenticated>
              <ViewWrapperAuthenticated path="/tabs">
                <TabsView />
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/sharedtabs">
                <SharedTabsView />
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/friends">
                <FriendsView />
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/settings">
                <SettingsView />
              </ViewWrapperAuthenticated>
            </Switch>
          </div>
        </Router>
      }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    setTokenAuthenticatedUser: () => dispatch(setTokenAuthenticatedUser())
  }
}

function mapStateToProps(state){
  return {
    initialAuthDone: state.auth.initialAuthDone
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
