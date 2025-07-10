import React from 'react';
import { Link } from 'react-router-dom';

function SubjectCard({ subject, onSelect, onEdit, onDelete }) {
  return (
    <div className="card">
      {/* Link ke halaman detail - menggunakan CSS yang sudah ada */}
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
      
      {/* Edit & Delete Buttons - Styled with Tailwind CSS */}
      {(onEdit || onDelete) && (
        <div className="mt-4 flex justify-center gap-3">
          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={() => onEdit(subject)}
              className="w-19 bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <span>✏️</span>
              Edit
            </button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              onClick={() => onDelete(subject.id)}
              className="w-19 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <span>🗑️</span>
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectCard;