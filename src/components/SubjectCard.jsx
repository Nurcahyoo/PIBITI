import React from 'react';
import { Link } from 'react-router-dom';

function SubjectCard({ subject, onSelect, onEdit, onDelete }) {
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

      {/* Tombol Edit */}
      {onEdit && (
        <div className="flex justify-end mt-2 space-x-4">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={() => onEdit(subject)}
          >
            Edit
          </button>

          {/* Tombol Hapus */}
          {onDelete && (
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={() => onDelete(subject.id)}
            >
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectCard;
