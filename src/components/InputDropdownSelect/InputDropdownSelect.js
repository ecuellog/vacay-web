import React, { useState, useEffect } from 'react';
import './InputDropdownSelect.scss';

function InputDropdownSelect(props) {
  const componentRef = React.useRef();
  const inputRef = React.useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleAnyClick);
    return () => document.removeEventListener('mousedown', handleAnyClick);
  }, []);

  function handleInputChange(e) {
    setShowDropdown(true);
    props.onValueChange(e.target.value);
  }

  function handleAnyClick(e) {
    if(!componentRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }

  function handleOptionSelect(option) {
    setShowDropdown(false);
    props.onSelect(option);
    props.onValueChange('');
  }

  function handleActionOptionSelect() {
    setShowDropdown(false);
    props.onActionOptionSelect();
    props.onValueChange('');
  }

  return (
    <div className="input-dropdown-select-component" ref={componentRef}>
      <div className="form-control dropdown-input" ref={inputRef} tabIndex="0">
        <input type="text" value={props.value} onChange={(e) => handleInputChange(e)}></input>
        <i
          className="fas fa-caret-down"
          onClick={() => setShowDropdown(!showDropdown)}
        ></i>
      </div>
      { showDropdown && 
        <div className="dropdown">
          <ul>
            { props.actionOption && props.value &&
              <li className="clickable" onClick={handleActionOptionSelect}>
                { props.actionOptionString }
              </li>
            }
            { props.optionListToString ? 
              <>
                { props.optionList.map(option => (
                    <li
                      className="clickable"
                      key={option[props.optionKey]}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {props.optionListToString(option)}
                    </li>
                ))}
              </>
              :
              <>
                { props.optionList.map(option => (
                  <li
                    className="clickable"
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </li>
                ))}
              </>
            }
            { !props.optionList.length && 
              <li className="non-clickable">
                {props.emptyListMessage}
              </li>
            }
          </ul>
        </div>
      }
      
    </div>
  );
}

export default InputDropdownSelect;