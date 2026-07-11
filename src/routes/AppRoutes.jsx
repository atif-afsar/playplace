import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Admissions from "../pages/public/Admissions";
import Academics from "../pages/public/Academics";
import Gallery from "../pages/public/Gallery";
import Contact from "../pages/public/Contact";
import Login from "../pages/public/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import ManageAdmissions from "../pages/admin/ManageAdmissions";
import ManageStudents from "../pages/admin/ManageStudents";
import AdminAttendance from "../pages/admin/Attendance";
import AdminResults from "../pages/admin/Results";
import AdminTimetable from "../pages/admin/Timetable";
import AdminFees from "../pages/admin/Fees";
import AdminNotices from "../pages/admin/Notices";
import AdminCalendar from "../pages/admin/Calendar";
import ParentDashboard from "../pages/parent/Dashboard";
import ViewTimetable from "../pages/parent/ViewTimetable";
import ViewResults from "../pages/parent/ViewResults";
import FeeStatus from "../pages/parent/FeeStatus";
import ParentNotices from "../pages/parent/Notices";
import ParentCalendar from "../pages/parent/Calendar";
import PublicCalendar from "../pages/public/Calendar";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      scrollToTarget();
      const t = setTimeout(scrollToTarget, 150);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/calendar" element={<PublicCalendar />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin (role-guarded) */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admissions"
          element={
            <ProtectedRoute role="admin">
              <ManageAdmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute role="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute role="admin">
              <AdminAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <ProtectedRoute role="admin">
              <AdminResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/timetable"
          element={
            <ProtectedRoute role="admin">
              <AdminTimetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/fees"
          element={
            <ProtectedRoute role="admin">
              <AdminFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <ProtectedRoute role="admin">
              <AdminNotices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <ProtectedRoute role="admin">
              <AdminCalendar />
            </ProtectedRoute>
          }
        />

        {/* Parent (role-guarded) */}
        <Route path="/parent" element={<Navigate to="/parent/dashboard" replace />} />
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute role="parent">
              <ParentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/timetable"
          element={
            <ProtectedRoute role="parent">
              <ViewTimetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/results"
          element={
            <ProtectedRoute role="parent">
              <ViewResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/fees"
          element={
            <ProtectedRoute role="parent">
              <FeeStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/notices"
          element={
            <ProtectedRoute role="parent">
              <ParentNotices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/calendar"
          element={
            <ProtectedRoute role="parent">
              <ParentCalendar />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
