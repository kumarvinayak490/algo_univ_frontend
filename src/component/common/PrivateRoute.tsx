import { useEffect } from "react";
import { useNavigate } from "react-router";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || '""');
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return <>{children}</>;
};
