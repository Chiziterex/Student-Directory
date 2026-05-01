// StudentDetail.js — Shows the full profile of one student.
// The matric number comes from the URL (e.g. /student/CSC%2F2029%2F001)
// We use that to find the matching student from our data.

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import "../css/Student-details.css";

const StudentDetail = () => {
  const { matricNo } = useParams(); // Gets the matric number from the URL
  const navigate = useNavigate();
  const { students, loading } = useStudents();

  // Decode the matric number (we encoded slashes earlier)
  const decoded = decodeURIComponent(matricNo);

  // Find the student whose matric_number matches the URL
  const student = students.find(
    (s) => s.matric_number?.toLowerCase() === decoded.toLowerCase(),
  );

  // ── Loading state ──
  if (loading) {
    return (
      <div className="detail-wrapper">
        <div className="detail-loading">Loading student profile...</div>
      </div>
    );
  }

  // ── Not found state ──
  if (!student) {
    return (
      <div className="detail-wrapper">
        <button className="detail-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="detail-not-found">
          <p>Student not found.</p>
          <p className="detail-matric-hint">Matric: {decoded}</p>
        </div>
      </div>
    );
  }

  // ── Full profile ──
  return (
    <div className="detail-wrapper">
      <button className="detail-back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Hero section: large photo + name */}
      <div className="detail-hero">
        <div className="detail-photo-frame">
          {student.photo_url ? (
            <img
              src={student.photo_url}
              alt={student.name}
              className="detail-photo"
            />
          ) : (
            <div className="detail-initials">
              {student.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
          )}
        </div>

        <div className="detail-hero-info">
          <h2 className="detail-name">{student.name}</h2>
          <p className="detail-matric">{student.matric_number}</p>
        </div>
      </div>

      {/* Info grid: all other fields from the spreadsheet */}
      <div className="detail-info-grid">
        {student.position_held && (
  <div className="detail-info-item">
    <span className="detail-info-label">Position Held</span>
    <span className="detail-info-value">{student.position_held}</span>
  </div>
)}
        {student.nickname && (
          <div className="detail-info-item">
            <span className="detail-info-label">Nickname</span>
            <span className="detail-info-value">{student.nickname}</span>
          </div>
        )}
        {student.email && (
          <div className="detail-info-item">
            <span className="detail-info-label">Email</span>
            <span className="detail-info-value">{student.email}</span>
          </div>
        )}
        {student.phone && (
          <div className="detail-info-item">
            <span className="detail-info-label">Phone</span>
            <span className="detail-info-value">{student.phone}</span>
          </div>
        )}
        {student.gender && (
          <div className="detail-info-item">
            <span className="detail-info-label">Gender</span>
            <span className="detail-info-value">{student.gender}</span>
          </div>
        )}
        {student.state_of_origin && (
          <div className="detail-info-item">
            <span className="detail-info-label">State of Origin</span>
            <span className="detail-info-value">{student.state_of_origin}</span>
          </div>
        )}
        {student.date_of_birth && (
          <div className="detail-info-item">
            <span className="detail-info-label">Date of Birth</span>
            <span className="detail-info-value">{student.date_of_birth}</span>
          </div>
        )}
        {student.level && (
          <div className="detail-info-item">
            <span className="detail-info-label">Level</span>
            <span className="detail-info-value">{student.level}</span>
          </div>
        )}
  
        {/* NEW */}
        {student.extracurricular && (
          <div className="detail-info-item">
            <span className="detail-info-label">Extracurricular</span>
            <span className="detail-info-value">{student.extracurricular}</span>
          </div>
        )}
      </div>

      {/* Add more fields here as needed, following the same pattern */}
    </div>
  );
};

export default StudentDetail;
