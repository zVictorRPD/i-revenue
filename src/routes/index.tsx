import { LoggedInLayout } from "@/components/layout/loggedIn";
import { Dashboard } from "@/pages/dashboard";
import { Expense } from "@/pages/expense";
import { Investment } from "@/pages/investment";
import { Revenue } from "@/pages/revenue";
import { Routes, Route, BrowserRouter } from "react-router";

export function RoutesIndex() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/renda" element={<Revenue />} />
          <Route path="/investimento" element={<Investment />} />
          <Route path="/despesa" element={<Expense />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}