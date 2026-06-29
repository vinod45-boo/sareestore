import { useState } from "react";
import WeaversLogin from "./WeaversLogin";
import SareeStore from "./SareeStore";
import AdminPanel from "./AdminPanel";

export default function App() {
  const [page, setPage] = useState("login");
  // Secret: type "admin" on login page while holding Shift, or use admin@weavers.com / admin123
  return (
    <>
      {page === "login" && (
        <WeaversLogin
          onLoginSuccess={(role) => setPage(role === "admin" ? "admin" : "store")}
        />
      )}
      {page === "store" && (
        <SareeStore onGoToHome={() => setPage("login")} />
      )}
      {page === "admin" && (
        <AdminPanel onLogout={() => setPage("login")} />
      )}
    </>
  );
}