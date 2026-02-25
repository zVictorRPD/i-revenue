
import AuthLayout from "@/components/layout/auth";
import { LoggedInLayout } from "@/components/layout/loggedIn";
import { AuthMiddleware } from "@/middleware/authMiddleware";
import { CreateAccount } from "@/pages/auth/createAccount";
import { Login } from "@/pages/auth/login";
import { Dashboard } from "@/pages/dashboard";
import { Expense } from "@/pages/expense";
import { Investment } from "@/pages/investment";
import { Revenue } from "@/pages/revenue";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";

export function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout><AuthMiddleware authenticationRequired={false} /></AuthLayout>}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CreateAccount />} />
        </Route>

        <Route element={<LoggedInLayout><AuthMiddleware authenticationRequired={true} /></LoggedInLayout>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/renda" element={<Revenue />} />
          <Route path="/investimento" element={<Investment />} />
          <Route path="/despesa" element={<Expense />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}