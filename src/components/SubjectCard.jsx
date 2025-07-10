import React from 'react';
import { Link } from 'react-router-dom';

function SubjectCard({ subject, onSelect }) {
  return (
    <div className="card">
      {/* Link ke halaman detail */}
      <Link to={`/subject/${subject.id}`}>
        <div 
          className={`subject-card ${subject.color}`}
          onClick={() => onSelect(subject)}
        >
          <div className="card-icon">
            {subject.icon}
          </div>
          <h3 className="card-title">
            {subject.name}
          </h3>
          <p className="card-description">
            {subject.description}
          </p>
          <button className="card-button">
            Mulai Belajar
          </button>
        </div>
      </Link>
    </div>
  );
}

export default SubjectCard;
