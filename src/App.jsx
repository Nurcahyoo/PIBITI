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
    color: 'bg-blue-100'
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const colorOptions = [
    { name: 'Biru', value: 'bg-blue-100' },
    { name: 'Hijau', value: 'bg-green-100' },
    { name: 'Ungu', value: 'bg-purple-100' },
    { name: 'Kuning', value: 'bg-yellow-100' }
  ];

  const handleDeleteSubject = (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus pelajaran ini?');
    if (confirmDelete) {
      setSubjects(subjects.filter(subject => subject.id !== id));

      // Jika sedang mengedit pelajaran yang dihapus, reset form
      if (editMode && editId === id) {
        setEditMode(false);
        setEditId(null);
        setNewSubject({ name: '', description: '', icon: '', color: 'bg-blue-100' });
        setShowForm(false);
      }
    }
  };

  const handleSubmitSubject = () => {
    if (!newSubject.name.trim() || !newSubject.description.trim()) {
      alert('Nama dan deskripsi harus diisi!');
      return;
    }

    if (editMode) {
      setSubjects(subjects.map(sub => (
        sub.id === editId ? { ...sub, ...newSubject } : sub
      )));
      setEditMode(false);
      setEditId(null);
    } else {
      const newId = Math.max(...subjects.map(s => s.id), 0) + 1;
      const subjectToAdd = { ...newSubject, id: newId };
      setSubjects([...subjects, subjectToAdd]);
    }

    setNewSubject({ name: '', description: '', icon: '', color: 'bg-blue-100' });
    setShowForm(false);
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
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditMode(false);
    setEditId(null);
    setNewSubject({ name: '', description: '', icon: '', color: 'bg-blue-100' });
    setShowForm(false);
  };

  useEffect(() => {
    document.title = 'Belajar Yuk - Beranda';
  }, []);

  return (
    <MainLayout>
      {/* CRUD Section - Styled with Tailwind CSS */}
      <div className="container mx-auto px-4 py-6">
        {/* Add Subject Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-55 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 border-2 border-blue-200 hover:border-blue-300"
          >
            {showForm ? '❌ Tutup' : '➕ Tambah Mata Pelajaran'}
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>{editMode ? '✏️' : '📝'}</span>
                {editMode ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
              </h2>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Nama Pelajaran */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Pelajaran
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Matematika"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ikon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ikon Pelajaran
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 📖"
                    value={newSubject.icon}
                    onChange={(e) => setNewSubject({ ...newSubject, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    placeholder="Contoh: Belajar matematika dasar untuk anak-anak"
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Pilihan Warna */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Warna Tema
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setNewSubject({ ...newSubject, color: color.value })}
                        className={`
                          ${color.value} 
                          w-full h-16 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-medium
                          ${newSubject.color === color.value 
                            ? 'border-blue-500 ring-2 ring-blue-200 scale-105' 
                            : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                      >
                        <div className="text-center">
                          <div className="text-lg">{newSubject.color === color.value ? '✓' : ''}</div>
                          <div className="text-xs text-gray-700">{color.name}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              {(newSubject.name || newSubject.icon) && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preview
                  </label>
                  <div className={`${newSubject.color} p-4 rounded-lg border-2 border-dashed border-gray-300 max-w-sm`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">{newSubject.icon || '📝'}</div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {newSubject.name || 'Nama Pelajaran'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {newSubject.description || 'Deskripsi pelajaran'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSubmitSubject}
                  className={`
                    ${editMode 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                    } 
                    text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-105
                  `}
                >
                  {editMode ? '💾 Simpan Perubahan' : '➕ Tambah Pelajaran'}
                </button>
                <button
                  onClick={handleCancelForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-200"
                >
                  ❌ Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subjects Grid - Menggunakan CSS yang sudah ada */}
      <div className="subjects-grid">
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