import React, { useState } from "react";

type InputProps = {
  onSearch: (location: string) => void;
};

const Input: React.FC<InputProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      <input
        type="text"
        id="top-input"
        placeholder="Search location "
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Input;
