// App.js — The root of the application.
// It sets up the routing so different URLs show different pages.

import React from "react";
import './App.css';
import Home from './components/Home';
import StudentList from "./components/Student-lists";
import StudentDetail from "./components/Student-details";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page — search bar + entry point */}
        <Route index element={<Home />} />

        {/* Student list page — shows all student cards */}
        <Route path="/student-list" element={<StudentList />} />

        {/* Student detail page — shows one student's full info */}
        {/* :matricNo is a URL parameter, e.g. /student/CSC/2029/001 */}
        <Route path="/student/:matricNo" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;