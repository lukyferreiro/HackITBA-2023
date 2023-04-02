import { useState } from 'react';

export default function CheckboxGroup(props) {

  const [checkedItems, setCheckedItems] = useState({});

  function handleChange(event) {
    const name = event.target.name;
    const isChecked = event.target.checked;
    setCheckedItems({
      ...checkedItems,
      [name]: isChecked
    });
  }

  return (
    <div>
      {props.options.map((option) => (
        <div key={option}>
          <label>
            <input 
              type="checkbox" 
              name={option} 
              checked={checkedItems[option] || false} 
              onChange={handleChange} 
              
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}   