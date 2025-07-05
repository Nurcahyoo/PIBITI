import React, { useState } from 'react';

function Navbar({ userName, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      onNameChange(tempName.trim());
      setIsEditing(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="logo">🎓</span>
          <span className="brand-text">Belajar Yuk!</span>
        </div>
        
        <div className="nav-user">
          {userName ? (
            <div className="user-info">
              <span className="greeting">Halo, </span>
              {isEditing ? (
                <form onSubmit={handleNameSubmit} className="name-form">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="name-input"
                    autoFocus
                    onBlur={() => setIsEditing(false)}
                  />
                </form>
              ) : (
                <span 
                  className="user-name"
                  onClick={() => setIsEditing(true)}
                >
                  {userName}
                </span>
              )}
            </div>
          ) : (
            <form onSubmit={handleNameSubmit} className="name-form">
              <input
                type="text"
                placeholder="Siapa nama kamu?"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="name-input"
              />
              <button type="submit" className="name-submit">
                ✓
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;