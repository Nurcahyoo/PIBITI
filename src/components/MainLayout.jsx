import React from 'react';

function MainLayout({ children }) {
  return (
    <main className="main-layout">
      <div className="container">
        {children}
      </div>
    </main>
  );
}

export default MainLayout;