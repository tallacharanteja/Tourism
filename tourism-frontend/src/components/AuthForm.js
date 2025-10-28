import React, { useState } from "react";
import api from "../api";

function AuthForm({ setUser }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post(`/users/${mode}`, form).then(res => {
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        alert("Logged in!");
      } else {
        alert("Invalid credentials or error.");
      }
    });
  };

  return (
    <div className="container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control m-2" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input className="form-control m-2" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-primary m-2" type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      <button className="btn btn-link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "No account? Register" : "Have account? Login"}
      </button>
    </div>
  );
}

export default AuthForm;
