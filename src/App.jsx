import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import MainLayout from './components/MainLayout';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import SubjectDetail from './pages/SubjectDetail';

// Halaman Beranda sebagai komponen terpisah
function HomePage({ userName, onSubjectSelect }) {
  const subjects = [
    { id: 1, name: 'Matematika', icon: '🔢', color: 'bg-blue-100', description: 'Latihan soal penjumlahan, pengurangan, dan perkalian' },
    { id: 2, name: 'Bahasa Indonesia', icon: '📚', color: 'bg-green-100', description: 'Belajar kosakata, tata bahasa, dan membaca Bahasa Indonesia' },
    { id: 3, name: 'IPA', icon: '🔬', color: 'bg-purple-100', description: 'Ilmu pengetahuan alam dan sains di sekitar untuk anak-anak' },
    { id: 4, name: 'IPS', icon: '🌍', color: 'bg-yellow-100', description: 'Pengetahuan sosial dan budaya Indonesia' }
  ];

  useEffect(() => {
  document.title = 'Belajar Yuk - Beranda';
  }, []);

  return (
    <MainLayout>
      <div className="welcome-section">
        <h1 className="main-title">Selamat Datang di Belajar Yuk!</h1>
        <p className="subtitle">Platform belajar yang menyenangkan untuk anak-anak sekolah dasar</p>
      </div>
      <div className="subjects-grid">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onSelect={onSubjectSelect}
          />
        ))}
      </div>
    </MainLayout>
  );
}

function AppContent() {
  const [userName, setUserName] = useState('');

  const location = useLocation();

  useEffect(() => {
    const savedName = localStorage.getItem('belajarYukUserName');
    if (savedName) setUserName(savedName);
  }, []);

  const handleNameChange = (name) => {
    setUserName(name);
    localStorage.setItem('belajarYukUserName', name);
  };

  const handleSubjectSelect = (subject) => {
    // Navigate to subject detail
    window.location.href = `/subject/${subject.id}`;
  };

  return (
    <div className="App">
      <Navbar userName={userName} onNameChange={handleNameChange} />
      <Routes>
        <Route path="/" element={<HomePage userName={userName} onSubjectSelect={handleSubjectSelect} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
