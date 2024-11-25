import React, { useState, useEffect } from "react";
import { Input, Switch } from "antd";
import { SearchOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import "./index.scss";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.body.classList.toggle("dark-theme", newMode);
      return newMode;
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        suffix={
          <SearchOutlined
            style={{ fontSize: "18px", cursor: "pointer", color: "#9DBCE3" }}
            onClick={handleSearch}
          />
        }
        className="header__input"
      />
      <Switch
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={darkMode}
        onChange={handleToggle}
        className={`theme-switch ${darkMode ? "dark" : "light"}`}
      />
    </div>
  );
};

export default Header;
