import { useState } from 'react';
import { Home, Settings, PieChart, Info } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-logo">
        <PieChart size={28} className="logo-icon" />
        <span className="logo-text">Meta<span className="accent">Dash</span></span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="info-badge">
          <Info size={16} />
          <span>V1.0.0</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
