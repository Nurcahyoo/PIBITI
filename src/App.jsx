import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SubjectCard from './components/SubjectCard';
import QuizModal from './components/QuizModal';
import MainLayout from './components/MainLayout';
import Footer from './components/Footer';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [userName, setUserName] = useState('');

  // Data mata pelajaran
  const subjects = [
    {
      id: 1,
      name: 'Matematika',
      icon: '🔢',
      color: 'bg-blue-100',
      description: 'Latihan soal penjumlahan, pengurangan, dan perkalian'
    },
    {
      id: 2,
      name: 'Bahasa Indonesia',
      icon: '📚',
      color: 'bg-green-100',
      description: 'Belajar kosakata, tata bahasa, dan membaca Bahasa Indonesia'
    },
    {
      id: 3,
      name: 'IPA',
      icon: '🔬',
      color: 'bg-purple-100',
      description: 'Sains dan alam sekitar untuk anak-anak'
    },
    {
      id: 4,
      name: 'IPS',
      icon: '🌍',
      color: 'bg-yellow-100',
      description: 'Pengetahuan sosial dan budaya Indonesia'
    }
  ];

  // Data soal sample
  const questions = {
    1: [ // Matematika
      {
        question: "Berapa hasil dari 15 + 8?",
        options: ["21", "22", "23", "24"],
        correct: 2
      },
      {
        question: "Jika ada 20 apel dan dimakan 7, berapa sisa apelnya?",
        options: ["12", "13", "14", "15"],
        correct: 1
      }
    ],
    2: [ // Bahasa Indonesia
      {
        question: "Apa sinonim dari kata 'besar'?",
        options: ["Kecil", "Raksasa", "Sedang", "Tipis"],
        correct: 1
      },
      {
        question: "Manakah yang termasuk kata benda?",
        options: ["Lari", "Indah", "Meja", "Cepat"],
        correct: 2
      }
    ]
  };

  // useEffect untuk mengubah title dokumen
  useEffect(() => {
    if (selectedSubject) {
      document.title = `Belajar Yuk! - ${selectedSubject.name}`;
    } else {
      document.title = 'Belajar Yuk! - Platform Belajar SD';
    }
  }, [selectedSubject]);

  // useEffect untuk menyimpan nama user ke localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('belajarYukUserName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQ = questions[selectedSubject.id][currentQuestion];
    if (answerIndex === currentQ.correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions[selectedSubject.id].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz selesai
      setTimeout(() => {
        alert(`Quiz selesai! Skor Anda: ${score + (answerIndex === currentQ.correct ? 1 : 0)}/${questions[selectedSubject.id].length}`);
        setShowQuiz(false);
        setSelectedSubject(null);
      }, 1000);
    }
  };

  const handleNameChange = (name) => {
    setUserName(name);
    localStorage.setItem('belajarYukUserName', name);
  };

  return (
    <div className="App">
      <Navbar userName={userName} onNameChange={handleNameChange} />
      
      <MainLayout>
        <div className="welcome-section">
          <h1 className="main-title">
            Selamat Datang di Belajar Yuk!
          </h1>
          <p className="subtitle">
            Platform belajar yang menyenangkan untuk anak-anak sekolah dasar
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map(subject => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onSelect={handleSubjectSelect}
            />
          ))}
        </div>

        {showQuiz && selectedSubject && (
          <QuizModal
            subject={selectedSubject}
            question={questions[selectedSubject.id][currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions[selectedSubject.id].length}
            onAnswerSelect={handleAnswerSelect}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </MainLayout>
      <Footer />
    </div>
  );
}

export default App;