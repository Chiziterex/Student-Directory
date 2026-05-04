// Home.js — The landing/search page.
// Users can search by name or matric number, or navigate to the full student list.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  // searchQuery stores what the user types in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // Pull student data from our custom hook
  const { students, loading } = useStudents();

  // handleChange fires every time the user types a character
  // We sanitize input — only allow letters, numbers, and slashes (for matric no.)
  const handleChange = (e) => {
    const cleaned = e.target.value.replace(/[^a-zA-Z0-9/ ]/g, '');
    setSearchQuery(cleaned);
  };

  // Filter students whose name OR matric number matches the query
  const results = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.matric_number?.toLowerCase().includes(q)
    );
  });

  // Navigate to a specific student's detail page using their matric number
  // We encode the matric number so slashes don't break the URL
  const goToStudent = (matricNo) => {
    navigate(`/student/${encodeURIComponent(matricNo)}`);
  };

    const maskMatric = (matric) => {
    if (!matric || matric.length <= 7) return matric;
    const start = matric.slice(0, 4); // first 4 characters
    const end = matric.slice(-2); // last 2 characters
    const masked = "*".repeat(matric.length - 7); // asterisks for the middle
    return `${start}${masked}${end}`;
  };

  return (
    <div className="home-wrapper">
      {/* Glowing background orb for visual drama */}
      <div className="home-orb" />

      <div className="home-container">
        {/* Page heading */}
        <h1 className="home-title">
          ANATOMY <span className="home-title-accent">2K29</span>
        </h1>
        <p className="home-subtitle">Student Directory</p>

        {/* Search input */}
        <div className="home-search-box">
          <input
            className="home-input"
            type="text"
            value={searchQuery}
            onChange={handleChange} 
            placeholder="Search by name or matric number..."
          />
        </div>

        {/* Search results — only shown when user has typed something */}
        {searchQuery.length > 0 && (
          <div className="home-results">
            {loading && <p className="home-hint">Loading students...</p>}

            {!loading && results.length === 0 && (
              <p className="home-hint">No student found.</p>
            )}

            {results.map((student) => (
              <div
                key={student.matric_number}
                className="home-result-item"
                onClick={() => goToStudent(student.matric_number)}
              >
                {/* Show student photo thumbnail if available */}
                {student.photo_url && (
                  <img
                    src={student.photo_url}
                    alt={student.name}
                    className="home-result-avatar"
                  />
                )}
                <div>
                  <p className="home-result-name">{student.name}</p>
                  <p className="home-result-matric">{maskMatric(student.matric_number)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="home-or">— or —</p>

        {/* Button to go to the full student grid */}
        <button
          className="home-btn"
          onClick={() => navigate('/student-list')}
        >
          View Full Student List
        </button>
      </div>
    </div>
  );
};

export default Home;