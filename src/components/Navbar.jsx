import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // tambahkan import ini

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
    <nav className="navbar bg-blue-600 text-blue px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold">
          🎓 Belajar Yuk!
        </Link>
        <Link to="/about" className="hover:underline">Tentang</Link>
        <Link to="/contact" className="hover:underline">Kontak</Link>
      </div>

      <div>
        {userName ? (
          <div className="flex items-center gap-2">
            <span>Halo,</span>
            {isEditing ? (
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="text-black px-1"
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                />
              </form>
            ) : (
              <span onClick={() => setIsEditing(true)} className="font-semibold cursor-pointer">
                {userName}
              </span>
            )}
          </div>
        ) : (
          <form onSubmit={handleNameSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Siapa nama kamu?"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="text-black px-1"
            />
            <button type="submit" className="bg-white text-blue-600 px-2 rounded">✓</button>
          </form>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
