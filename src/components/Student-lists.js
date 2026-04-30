// Student-lists.js — Full student grid page with search functionality

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudents } from "../hooks/useStudents";
import StudentCard from "./Student-card";
import "../css/Student-list.css";

const StudentList = () => {
  const navigate = useNavigate();

  // 'search' holds what the user types. 'setSearch' updates it.
  // This MUST be declared here — it was accidentally deleted
  const [search, setSearch] = useState("");

  // Pull all student data from Google Sheets via our custom hook
  const { students, loading, error } = useStudents();

  // Filter students in real time based on what's typed in the search bar
  // This MUST also be declared here, before the return statement
  const filteredStudents = students.filter((student) => {
    const q = search.toLowerCase();
    return (
      student.name?.toLowerCase().includes(q) ||
      student.matric_number?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="student-list-page">

      {/* Top bar — back button, title, student count */}
      <header className="list-header">
        <button className="list-back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1 className="list-title">
          ANATOMY <span className="list-title-accent">2K29</span>
        </h1>
        <p className="list-count">
          {!loading && `${filteredStudents.length} students`}
        </p>
      </header>

      {/* Search bar */}
      <div className="list-search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or matric number..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value.replace(/[^a-zA-Z0-9/ ]/g, ""))
          }
        />
        {/* Clear button — only visible when something is typed */}
        {search && (
          <button className="list-clear-btn" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="list-error">⚠️ Could not load students: {error}</div>
      )}

      {/* Loading message */}
      {loading && (
        <p style={{ textAlign: "center", color: "#6b7f96", marginTop: "3rem" }}>
          Loading students...
        </p>
      )}

      {/* Student grid — only renders after loading is complete */}
      {!loading && !error && (
        <>
          {filteredStudents.length === 0 ? (
            <p className="list-empty">No students match your search.</p>
          ) : (
            <div className="student-grid">
              {filteredStudents.map((student, index) => (
                <StudentCard
                  key={student.matric_number}
                  student={student}
                  index={index}
                />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default StudentList;