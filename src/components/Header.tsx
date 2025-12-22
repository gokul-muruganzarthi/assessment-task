import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="header">
      <div>
        Welcome, <b>{user.name}</b> ({user.city})
      </div>
      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}
