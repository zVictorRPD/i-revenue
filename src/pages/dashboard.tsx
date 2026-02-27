import { PageHeader } from "@/components/global/pageHeader";
import { api } from "@/utils/api";
import { useEffect } from "react";

export function Dashboard() {
  const teste = api.get("/dashboard");
  useEffect(() => {
    teste.then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <PageHeader title="Dashboard" />
    </>
  );
}
