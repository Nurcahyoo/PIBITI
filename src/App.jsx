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

function HomePage({ userName, onSubjectSelect }) {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Matematika', icon: '🔢', color: 'bg-blue-100', description: 'Latihan soal penjumlahan, pengurangan, dan perkalian' },
    { id: 2, name: 'Bahasa Indonesia', icon: '📚', color: 'bg-green-100', description: 'Belajar kosakata, tata bahasa, dan membaca Bahasa Indonesia' },
    { id: 3, name: 'IPA', icon: '🔬', color: 'bg-purple-100', description: 'Ilmu pengetahuan alam dan sains di sekitar untuk anak-anak' },
    { id: 4, name: 'IPS', icon: '🌍', color: 'bg-yellow-100', description: 'Pengetahuan sosial dan budaya Indonesia' }
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    description: '',
    icon: '',
    color: 'bg-gray-100'
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleDeleteSubject = (id) => {
  const confirmDelete = window.confirm('Yakin ingin menghapus pelajaran ini?');
  if (confirmDelete) {
    setSubjects(subjects.filter(subject => subject.id !== id));

    // Jika sedang mengedit pelajaran yang dihapus, reset form
    if (editMode && editId === id) {
      setEditMode(false);
      setEditId(null);
      setNewSubject({ name: '', description: '', icon: '', color: 'bg-gray-100' });
    }
  }
  };

  const handleSubmitSubject = () => {
    if (editMode) {
      setSubjects(subjects.map(sub => (
        sub.id === editId ? { ...sub, ...newSubject } : sub
      )));
      setEditMode(false);
      setEditId(null);
    } else {
      const newId = subjects.length + 1;
      const subjectToAdd = { ...newSubject, id: newId };
      setSubjects([...subjects, subjectToAdd]);
    }

    setNewSubject({ name: '', description: '', icon: '', color: 'bg-gray-100' });
  };

  const handleEditSubject = (subject) => {
    setNewSubject({
      name: subject.name,
      description: subject.description,
      icon: subject.icon,
      color: subject.color,
    });
    setEditMode(true);
    setEditId(subject.id);
  };

  useEffect(() => {
    document.title = 'Belajar Yuk - Beranda';
  }, []);

  return (
    <MainLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          {editMode ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Nama"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={newSubject.description}
            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Ikon (misal 📖)"
            value={newSubject.icon}
            onChange={(e) => setNewSubject({ ...newSubject, icon: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Warna (misal bg-red-100)"
            value={newSubject.color}
            onChange={(e) => setNewSubject({ ...newSubject, color: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleSubmitSubject}
          className={`${editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}
        >
          {editMode ? 'Simpan Perubahan' : 'Tambah Pelajaran'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onSelect={onSubjectSelect}
            onEdit={handleEditSubject}
            onDelete={handleDeleteSubject}
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
