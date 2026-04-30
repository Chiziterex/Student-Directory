// StudentCard.js — A single student card shown in the grid.
// It displays the student's photo (square box) and name below it.
// Clicking it navigates to that student's detail page.
//
// Props received:
//   - student: the full student object from Google Sheets
//   - index: position in the list, used to stagger the ball-in animation

import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Student-card.css';

const StudentCard = ({ student, index }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    // Encode the matric number so URL-unsafe characters (like /) don't break routing
    navigate(`/student/${encodeURIComponent(student.matric_number)}`);
  };

  return (
    // The card div gets an inline style for animation-delay.
    // Each card delays slightly more than the previous, creating a staggered "ball in" effect.
    <div
      className="student-card"
      style={{ animationDelay: `${index * 0.05}s` }} // 0.05s gap between each card
      onClick={goToDetail}
    >
      {/* Square photo box */}
      <div className="student-card-photo-wrapper">
        {student.photo_url ? (
          <img
            src={student.photo_url}
            alt={student.name}
            className="student-card-photo"
          />
        ) : (
          // Fallback: show initials if no photo is available
          <div className="student-card-initials">
            {student.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
        )}
      </div>

      {/* Name tag beneath the photo */}
      <div className="student-card-name-tag">
        <p className="student-card-name">{student.name}</p>
      </div>
    </div>
  );
};

export default StudentCard;