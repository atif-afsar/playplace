import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Guards routes by auth + role.
 * - Not logged in → /login
 * - Logged in but wrong role → sent to their own dashboard (or home)
 */
export default function ProtectedRoute({ role, children }) {
  const { user, role: userRole, loading, profileLoading } = useAuth();

  // Wait for BOTH the session check and (if logged in) the role fetch, so we
  // never redirect based on a not-yet-loaded role.
  if (loading || (user && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-5xl text-primary">
            progress_activity
          </span>
          <p className="font-medium text-on-surface-variant">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && userRole !== role) {
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (userRole === "parent") return <Navigate to="/parent/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
