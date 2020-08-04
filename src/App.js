import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { setTokenAuthenticatedUser } from './store/actions/auth';
import { toast } from 'react-toastify';
import LoginView from './views/LoginView/LoginView';
import TabsView from './views//TabsView/TabsView';
import SharedTabsView from './views/SharedTabsView';
import FriendsView from './views/FriendsView';
import SettingsView from './views/SettingsView';
import TabDetailView from './views/TabDetailView/TabDetailView';
import './App.css';
import ViewWrapperAuthenticated from './components/ViewWrapperAuthenticated';
import ViewWrapperUnauthenticated from './components/ViewWrapperUnauthenticated';

toast.configure({
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: true,
  draggablePercent: 60,
  pauseOnHover: true,
  closeButton: false
});

function App(props) {
  props.setTokenAuthenticatedUser();

  return (
    <div>
    { props.initialAuthDone && 
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <ViewWrapperUnauthenticated path="/login">
              <LoginView />
            </ViewWrapperUnauthenticated>
            <ViewWrapperAuthenticated exact path="/tabs">
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

            {/* Tab routes */}
            <ViewWrapperAuthenticated path="/tabs/:tabId">
              <TabDetailView />
            </ViewWrapperAuthenticated>
          </Switch>
        </div>
      </Router>
    }
    </div>
  );
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
