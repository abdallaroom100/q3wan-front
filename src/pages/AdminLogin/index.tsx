import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      alert("كلمة السر غير صحيحة");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">تسجيل دخول الأدمن</h2>
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          دخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin; 