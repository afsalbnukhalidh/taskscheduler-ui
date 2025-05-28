import React, { useState } from 'react';

function Dropdown({ data = {}, onSelect, selectedname }) {
  const [selectedKey, setSelectedKey] = useState('');

  const handleChange = (e) => {
    const key = e.target.value;
    const label = data[key];
    setSelectedKey(key);
    onSelect?.(key, label);
  };

  return (
    <select className="form-select text-secondary" value={selectedKey || ""} onChange={handleChange}>
      <option value="" disabled>Select one {selectedname}</option>
      {Object.entries(data).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;

