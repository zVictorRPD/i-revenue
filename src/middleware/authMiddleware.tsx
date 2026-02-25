import { useUserStore } from "@/storage/user";
import { Navigate, Outlet } from "react-router";

type AuthMiddlewareProps = {
  authenticationRequired: boolean;
};

export function AuthMiddleware({ authenticationRequired }: AuthMiddlewareProps) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated && authenticationRequired) {
    return <Navigate to="/login" replace />;
  }

  if(isAuthenticated && !authenticationRequired) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}