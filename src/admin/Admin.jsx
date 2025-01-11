import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Typography, FormControl, FormLabel, Input, Button, Alert, GlobalStyles } from "@mui/joy";
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
    <CssVarsProvider>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            fontFamily: "Roboto, sans-serif",
            backgroundColor: "#f4f4f4",
          },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Box
          sx={{
            width: 360,
            p: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography level="h4" fontWeight="bold" textAlign="center" mb={2}>
            Admin Panel
          </Typography>
          {error && (
            <Alert color="danger" sx={{ mb: 2, fontSize: "14px" }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Login</FormLabel>
              <Input
                placeholder="Loginni kiriting"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ mb: 3 }}>
              <FormLabel>Parol</FormLabel>
              <Input
                type="password"
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" color="primary" fullWidth>
              Kirish
            </Button>
          </form>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default Admin;
