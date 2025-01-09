import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import UploadPhoto from "./uploadPhoto";

const Admin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const adminLogin = import.meta.env.VITE_APP_ADMIN_LOGIN;
    const adminPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;

    if (login === adminLogin && password === adminPassword) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Login yoki parol noto‘g‘ri!");
    }
  };

  if (isLoggedIn) {
    return <UploadPhoto />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Panel</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-gray-700">
              Login
            </label>
            <input
              type="text"
              id="login"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
