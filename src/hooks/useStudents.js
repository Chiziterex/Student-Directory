import { useState, useEffect } from "react";

const SHEET_ID = "1xz-nYFTQWekbb_v3W6dtKHdxMpIJAsi_";
const SHEET_GID = "1810890644";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch sheet data.");

        const text = await response.text();

        // Strip the Google wrapper to get raw JSON
        const jsonString = text
          .replace("/*O_o*/", "")
          .replace(/google\.visualization\.Query\.setResponse\(/, "")
          .replace(/\);$/, "")
          .trim();

        const json = JSON.parse(jsonString);

        // Get column headers from the first row
        const headers = json.table.cols.map((col) =>
          col.label.trim().toLowerCase().replace(/\s+/g, "_")
        );

        const parsed = json.table.rows
          // ── KEY FIX: skip rows where ALL cells are null/empty ──
          // This removes blank rows at the bottom of your sheet
          .filter((row) => row.c && row.c.some((cell) => cell?.v != null && cell.v !== ""))
          .map((row) => {
            const student = {};
            headers.forEach((header, i) => {
              // Convert numbers Google returns (e.g. matric) back to strings
              const val = row.c[i]?.v ?? "";
              student[header] = String(val).trim();
            });
            return student;
          })
          // ── Remove duplicate rows by matric_number ──
          .filter((student, index, self) =>
            student.matric_number &&  // must have a matric number
            index === self.findIndex((s) => s.matric_number === student.matric_number)
          );

        setStudents(parsed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  return { students, loading, error };
}