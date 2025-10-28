import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import PlaceList from "./components/PlaceList";
import AddPlace from "./components/AddPlace";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <>
          <div className="container mt-3 mb-3 d-flex justify-content-between align-items-center">
            <div>
              Welcome, <b>{user.username}</b>!
              {user.admin && <span className="badge bg-primary ms-2">Admin</span>}
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
          </div>
          {user.admin && <AddPlace user={user} />}
          <PlaceList user={user} />
        </>
      ) : (
        <AuthForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
