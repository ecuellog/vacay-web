import React from 'react';
import { fetchCreatedTabs } from '../store/actions/tabs';
import { connect } from 'react-redux';
import TabItem from '../components/TabItem/TabItem';

class TabsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCreatedTabs();
  }
  
  render() {
    return (
      <div>
        { this.props.tabs.map((tab) => 
          <TabItem tab={tab} key={tab._id}/>
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCreatedTabs: () => dispatch(fetchCreatedTabs())
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs.tabs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsView);