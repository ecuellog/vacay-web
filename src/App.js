import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setTokenAuthenticatedUser } from './store/actions/auth';

// Components
import SideBarViewWrapper from './components/SideBarViewContainer/SideBarViewContainer';
import LoginView from './views/LoginView/LoginView';
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
            <Switch>
              <Redirect exact from="/" to="/login" />
              <ViewWrapperUnauthenticated path="/login">
                <LoginView />
              </ViewWrapperUnauthenticated>
              <ViewWrapperAuthenticated path="/tabs">
                <SideBarViewWrapper>
                  <TabsView />
                </SideBarViewWrapper>
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/sharedtabs">
                <SideBarViewWrapper>
                  <SharedTabsView />
                </SideBarViewWrapper>
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/friends">
                <SideBarViewWrapper>
                  <FriendsView />
                </SideBarViewWrapper>
              </ViewWrapperAuthenticated>
              <ViewWrapperAuthenticated path="/settings">
                <SideBarViewWrapper>
                  <SettingsView />
                </SideBarViewWrapper>
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
