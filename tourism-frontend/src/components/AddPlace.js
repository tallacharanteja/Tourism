import React, { useState } from "react";
import api from "../api";

function AddPlace() {
  const [place, setPlace] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    imageUrl: ""
  });

  const handleChange = e => {
    setPlace({ ...place, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post("/places", place)
      .then(() => {
        alert("Place Added!");
        setPlace({ name: "", location: "", description: "", price: "", imageUrl: "" });
      })
      .catch(() => alert("Error adding place!"));
  };

  return (
    <div className="container mt-4" style={{background: "#e8f0fe", borderRadius: 18, maxWidth: 680, marginBottom: 40, padding: 24}}>
      <h2 style={{color: "#264653"}}>Add New Place</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control m-2" name="name" placeholder="Name" value={place.name} onChange={handleChange} required />
        <input className="form-control m-2" name="location" placeholder="Location" value={place.location} onChange={handleChange} required />
        <input className="form-control m-2" name="imageUrl" placeholder="Image URL" value={place.imageUrl} onChange={handleChange} required />
        <textarea className="form-control m-2" name="description" placeholder="Description" value={place.description} onChange={handleChange} required></textarea>
        <input className="form-control m-2" name="price" type="number" placeholder="Price" value={place.price} onChange={handleChange} required />
        <button type="submit" className="btn btn-primary m-2">Save</button>
      </form>
    </div>
  );
}

export default AddPlace;
