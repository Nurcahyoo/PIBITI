import React from 'react';

function QuizModal({ subject, question, questionNumber, totalQuestions, onAnswerSelect, onClose }) {
  if (!subject || !question) return null;

  return (    
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <div className="quiz-header">
          <h3 className="quiz-subject">
            {subject.icon} {subject.name}
          </h3>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="quiz-progress">
          <div className="progress-text">
            Soal {questionNumber} dari {totalQuestions}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="quiz-content">
          <h4 className="question-text">
            {question.question}
          </h4>
          
          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => onAnswerSelect(index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="option-text">
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizModal;