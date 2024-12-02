import React, { useState } from "react";
import { Input, Switch } from "antd";
import { SearchOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import "./index.scss";
import { useTheme } from "../../context/themeContext";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className={`theme-switch ${isDarkMode ? "dark" : "light"}`}
      />
    </div>
  );
};

export default Header;
