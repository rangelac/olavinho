import { Bell, Search, User } from 'lucide-react';
import './Header.css';

const Header = ({ title }) => {
  return (
    <header className="app-header glass-panel">
      <div className="header-title">
        <h1>{title}</h1>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Buscar..." className="search-input" />
        </div>
        
        <button className="btn-icon">
          <Bell size={20} />
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
