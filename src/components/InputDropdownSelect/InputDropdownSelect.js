import React from 'react';
import './InputDropdownSelect.scss';

function InputDropdownSelect(props) {
// Props:
// - Persons
// - Value
// - onChange
// - onEnter
  const persons = ['Add new person', 'timmy', 'jimmy', 'tommy'];
  return (
    <div className="input-dropdown-select-component">
      <div className="form-control dropdown-input">
        <input type="text"></input>
        <i className="fas fa-caret-down"></i>
      </div>
      <div className="dropdown">
        <ul>
          { persons.map(person => (
            <li>
              {person}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InputDropdownSelect;