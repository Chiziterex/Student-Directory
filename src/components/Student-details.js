// StudentDetail.js — Shows the full profile of one student.

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import "../css/Student-details.css";

const StudentDetail = () => {
  const { matricNo } = useParams();
  const navigate = useNavigate();
  const { students, loading } = useStudents();

  const decoded = decodeURIComponent(matricNo);

  const student = students.find(
    (s) => s.matric_number?.toLowerCase() === decoded.toLowerCase()
  );

  // Masks matric number for privacy — shows first 4 and last 3 characters
  const maskMatric = (matric) => {
    if (!matric || matric.length <= 7) return matric;
    const start = matric.slice(0, 4);
    const end = matric.slice(-3);
    const masked = "*".repeat(matric.length - 7);
    return `${start}${masked}${end}`;
  };

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

      {/* Hero: photo + name */}
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
          <p className="detail-matric">{maskMatric(student.matric_number)}</p>
        </div>
      </div>

      {/* Info grid */}
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

        {student.phone && (
          <div className="detail-info-item">
            <span className="detail-info-label">Phone</span>
            <span className="detail-info-value">{student.phone}</span>
          </div>
        )}

        {student.email && (
          <div className="detail-info-item">
            <span className="detail-info-label">Email</span>
            <span className="detail-info-value">{student.email}</span>
          </div>
        )}

        {/* Make sure your sheet column header is exactly: date_of_birth */}
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

        {student.extracurricular && (
          <div className="detail-info-item">
            <span className="detail-info-label">Extracurricular</span>
            <span className="detail-info-value">{student.extracurricular}</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDetail;