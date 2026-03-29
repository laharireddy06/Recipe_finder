import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Signup failed");
        return;
      }

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 text-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded text-black"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 w-full py-2 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
