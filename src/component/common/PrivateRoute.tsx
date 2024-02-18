import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = JSON.parse(localStorage.getItem("token") || '""');
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};
