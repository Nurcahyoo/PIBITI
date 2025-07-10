import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import QuizModal from '../components/QuizModal';
import '../App.css'; // pastikan ini diimpor

const subjectList = [
  { id: 1, name: 'Matematika', icon: '🔢', colorClass: 'matematika-bg', description: 'Latihan soal penjumlahan, pengurangan, dan perkalian' },
  { id: 2, name: 'Bahasa Indonesia', icon: '📚', colorClass: 'bindo-bg', description: 'Belajar kosakata, tata bahasa, dan membaca Bahasa Indonesia' },
  { id: 3, name: 'IPA', icon: '🔬', colorClass: 'ipa-bg', description: 'Ilmu pengetahuan alam dan sains di sekitar untuk anak-anak' },
  { id: 4, name: 'IPS', icon: '🌍', colorClass: 'ips-bg', description: 'Pengetahuan sosial dan budaya Indonesia' }
];

const questions = {
  1: [
    { question: "Berapa hasil dari 15 + 8?", options: ["21", "22", "23", "24"], correct: 2 },
    { question: "Jika ada 20 apel dan dimakan 7, berapa sisa apelnya?", options: ["12", "13", "14", "15"], correct: 1 }
  ],
  2: [
    { question: "Apa sinonim dari kata 'besar'?", options: ["Kecil", "Raksasa", "Sedang", "Tipis"], correct: 1 },
    { question: "Manakah yang termasuk kata benda?", options: ["Lari", "Indah", "Meja", "Cepat"], correct: 2 }
  ],
  3: [
    { question: "Benda apa yang digunakan untuk melihat benda kecil?", options: ["Mikroskop", "Kaca", "TV", "Komputer"], correct: 0 },
    { question: "Air mengalir dari tempat ...", options: ["Tinggi ke rendah", "Rendah ke tinggi", "Bulat ke datar", "Datar ke bulat"], correct: 0 }
  ],
  4: [
    { question: "Apa ibu kota Indonesia?", options: ["Bandung", "Surabaya", "Jakarta", "Yogyakarta"], correct: 2 },
    { question: "Hari Kemerdekaan Indonesia jatuh pada tanggal?", options: ["17 Agustus", "10 November", "1 Juni", "20 Mei"], correct: 0 }
  ],
};

function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const subjectId = parseInt(id, 10);
  const subject = subjectList.find(sub => sub.id === subjectId);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (subject) {
      document.title = `Belajar Yuk - ${subject.name}`;
    } else {
      document.title = 'Belajar Yuk - Mata Pelajaran';
    }
    return () => {
      document.title = 'Belajar Yuk';
    };
    }, [subject]);

  const handleStart = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQ = questions[subject.id][currentQuestion];
    if (answerIndex === currentQ.correct) {
      setScore(score + 1);
    }

    if (currentQuestion < questions[subject.id].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setTimeout(() => {
        alert(`Quiz selesai! Skor Anda: ${score + (answerIndex === currentQ.correct ? 1 : 0)}/${questions[subject.id].length}`);
        setShowQuiz(false);
      }, 800);
    }
  };

  if (!subject) {
    return (
      <MainLayout>
        <div className="not-found">
          <h2>Mata pelajaran tidak ditemukan.</h2>
          <button onClick={() => navigate('/')}>Kembali ke Beranda</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={`subject-card ${subject.colorClass}`}>
        <div className="subject-header">
          <span className="subject-icon">{subject.icon}</span>
          <div>
            <h2 className="subject-title">{subject.name}</h2>
            <p className="subject-desc">{subject.description}</p>
          </div>
        </div>

    {!showQuiz && (
        <div className="button-group">
            <button onClick={handleStart} className="start-button">Mulai Belajar</button>
            <button onClick={() => navigate('/')} className="back-button">← Kembali</button>
        </div>
    )}
      </div>

      {showQuiz && (
        <QuizModal
          subject={subject}
          question={questions[subject.id][currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions[subject.id].length}
          onAnswerSelect={handleAnswerSelect}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </MainLayout>
  );
}

export default SubjectDetail;
