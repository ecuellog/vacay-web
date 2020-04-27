import React from 'react';
import './InputDropdownSelect.scss';

class InputDropdownSelect extends React.Component {
  constructor(props) {
    super(props);
    
    this.componentRef = React.createRef();
    this.inputRef = React.createRef();

    this.state = {
      showDropdown: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnyClick = this.handleAnyClick.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.handleActionOptionSelect = this.handleActionOptionSelect.bind(this);
  }

  handleInputChange(e) {
    this.setState({showDropdown: true});
    this.props.onValueChange(e.target.value);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleAnyClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleAnyClick);
  }

  handleAnyClick(e) {
    if(!this.componentRef.current.contains(e.target)) {
      this.setState({showDropdown: false});
    }
  }

  handleOptionSelect(option) {
    this.setState({showDropdown: false});
    this.props.onSelect(option);
    this.props.onValueChange('');
  }

  handleActionOptionSelect() {
    this.setState({showDropdown: false});
    this.props.onActionOptionSelect();
    this.props.onValueChange('');
  }

  render() {
    return (
      <div className="input-dropdown-select-component" ref={this.componentRef}>
        <div className="form-control dropdown-input" ref={this.inputRef} tabIndex="0">
          <input type="text" value={this.props.value} onChange={(e) => this.handleInputChange(e)}></input>
          <i
            className="fas fa-caret-down"
            onClick={() => this.setState({showDropdown: !this.state.showDropdown})}
          ></i>
        </div>
        { this.state.showDropdown && 
          <div className="dropdown">
            <ul>
              { this.props.actionOption && this.props.value &&
                <li className="clickable" onClick={this.handleActionOptionSelect}>
                  { this.props.actionOptionString }
                </li>
              }
              { this.props.optionList.map(option => (
                <li className="clickable" key={option} onClick={() => this.handleOptionSelect(option)}>
                  {option}
                </li>
              ))}
              { !this.props.optionList.length && 
                <li className="non-clickable">
                  {this.props.emptyListMessage}
                </li>
              }
            </ul>
          </div>
        }
        
      </div>
    );
  }
}

export default InputDropdownSelect;